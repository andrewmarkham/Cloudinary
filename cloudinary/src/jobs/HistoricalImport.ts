import {
  Job,
  JobStatus,
  logger,
  notifications,
  storage,
  ValueHash,
} from '@zaiusinc/app-sdk';
import { odp } from '@zaiusinc/node-sdk';
import fetch from 'node-fetch';
import { transformAssetToPayload } from '../lib/transformAssetToPayload';
import { CloudinaryImage } from '../data/CloudinaryImage';
// Use Node.js Buffer globally, do not import from 'node-fetch'

interface HistoricalImportJobStatus extends JobStatus {
  state: {
    cursor: string;
    count: number;
    retries: number;
  };
}

interface HistoricalImportResult {
  next_cursor: string;
  resources: CloudinaryImage[];
}

/**
 * Example historical import job
 * Fetches assets from an invented API and loads them into Optimizely Hub
 * Includes backoff and retry logic in case the API is unstable
 */
export class HistoricalImport extends Job {
  private apiKey!: string;

  /**
   * Prepares to run a job. Prepare is called at the start of a job
   * and again only if the job was interrupted and is being resumed.
   * Use this function to read secrets and establish connections to simplify the job loop (perform).
   * @param params a hash if params were supplied to the job run, otherwise an empty hash
   * @param status if job was interrupted and should continue from the last known state
   */
  public async prepare(
    params: ValueHash,
    status?: HistoricalImportJobStatus
  ): Promise<HistoricalImportJobStatus> {
    logger.info(
      'Preparing Historical Import Job with params:',
      params,
      'and status',
      status
    );
    this.apiKey = (await storage.secrets.get('apiConfig')).apiKey as string;
    if (status) {
      // if we resuming, we will be provided the last state where we left off
      // Long running jobs are more likely to be forced to pause and resume
      // Shorter jobs are less likely, but may still be resumed
      return status;
    }
    return {
      state: { cursor: '', count: 0, retries: 0 },
      complete: false,
    };
  }

  /**
   * Performs a unit of work. Jobs should perform a small unit of work and then return the current state.
   * Perform is called in a loop where the previously returned state will be given to the next iteration.
   * Iteration will continue until the returned state.complete is set to true or the job is interrupted.
   * @param status last known job state and status
   * @returns The current JobStatus/state that can be used to perform the next iteration or resume a job if interrupted.
   */
  public async perform(
    status: HistoricalImportJobStatus
  ): Promise<HistoricalImportJobStatus> {
    const state = status.state;
    let encounteredError = false;
    try {
      // fetch some assets from our API
      const response = await this.fetch(state.cursor, 100);

      if (response.ok) {
        const result = (await response.json()) as HistoricalImportResult;
        // In this example, 0 assets means we have imported all the data
        if (result.resources.length === 0) {
          // Notify the customer we completed the import and provide some information to show it was successful
          await notifications.success(
            'Historical Import',
            'Completed Historical Import',
            `Imported ${state.count} assets.`
          );
          status.complete = true;
          return status;
        }

        // Transform our assets and send a batch to Optimizely Hub
        await odp.object('cloudinary_assets', result.resources.map(transformAssetToPayload));

        // Update our state so the next iteration can continue where we left off
        state.cursor = result.next_cursor;
        state.count += result.resources.length;
      } else {
        logger.error(
          'Historical import error:',
          response.status,
          response.body.read().toString()
        );
        encounteredError = true;
      }
    } catch (e) {
      // Log all handled errors for future investigation. Customers will not see these logs.
      logger.error(e);
      encounteredError = true;
    }

    // If we encountered an error, backoff and retry up to 5 times
    if (encounteredError) {
      if (state.retries >= 5) {
        // Notify the customer there was a problem with the import
        await notifications.error(
          'Historical Import',
          'Failed to complete historical import',
          'Maximum retries exceeded'
        );
        status.complete = true;
      } else {
        state.retries++;
        await this.sleep(state.retries * 5000);
      }
    }

    // Our state has been updated inside status so we know where to resume
    return status;
  }

  /**
   * Make an API call to get the next page and pass in our API key
   * @param cursor last timestamp
   * @param pageSize maximum number of assets to pull
   */
  private async fetch(cursor: string, pageSize: number) {

    const username = '928476237878724';
    const password = 'Es10da-xvBB2w6vDEHARbjnHCQA';
    const instanceUrl = 'https://api.cloudinary.com/v1_1/dcoqw592t';
    const url = cursor?.length > 0
      ? `${instanceUrl}/resources/image?max_results=${pageSize}&next_cursor=${cursor}&context=true`
      : `${instanceUrl}/resources/image?max_results=${pageSize}&context=true`;

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    return await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'content-type': 'application/json'
      },
    });
  }
}
