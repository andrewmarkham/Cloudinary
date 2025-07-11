import {Job, JobStatus, logger, ValueHash} from '@zaiusinc/app-sdk';

interface NightlyImportJobStatus extends JobStatus {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  state: {
    // TODO: define your job state here
  };
}

/**
 * Performs a nightly import
 * See HistoricalImport.ts for a more complete example job
 */
export class NightlyImport extends Job {

  /**
   * Prepares to run a job. Prepare is called at the start of a job
   * and again only if the job was interrupted and is being resumed.
   * Use this function to read secrets and establish connections to simplify the job loop (perform).
   * @param params a hash if params were supplied to the job run, otherwise an empty hash
   * @param status if job was interrupted and should continue from the last known state
   */
  public async prepare(params: ValueHash, status?: NightlyImportJobStatus): Promise<NightlyImportJobStatus> {
    logger.info('Preparing Nightly Import Job with params:', params, 'and status', status);
    // TODO: Prepare for a job run
    return {state: {}, complete: false};
  }

  /**
   * Performs a unit of work. Jobs should perform a small unit of work and then return the current state.
   * Perform is called in a loop where the previously returned state will be given to the next iteration.
   * Iteration will continue until the returned state.complete is set to true or the job is interrupted.
   * @param status last known job state and status
   * @returns The current JobStatus/state that can be used to perform the next iteration or resume a job if interrupted.
   */
  public async perform(status: NightlyImportJobStatus): Promise<NightlyImportJobStatus> {
    // TODO: perform a small unit of work, then return your state

    // When you are finished, set complete to true
    status.complete = true;

    // Return your status. If complete is false, perform will be called again immediately with the status you returned
    return status;
  }
}
