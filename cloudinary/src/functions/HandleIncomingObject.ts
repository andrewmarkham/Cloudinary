import { logger, Function, Response } from '@zaiusinc/app-sdk';
import { odp } from '@zaiusinc/node-sdk';
import { IncomingAsset } from '../data/IncomingAssets';
import { transformAssetToPayload } from '../lib/transformAssetToPayload';

export class HandleIncomingObject extends Function {
  /**
   * Handle a request to the handle_incoming_object function URL
   * this.request contains the request information
   * @returns Response as the HTTP response
   */
  public async perform(): Promise<Response> {
    const id = this.request.params['id'] as string;
    if (!id) {
      return new Response(400, 'Missing required id parameter');
    } else {
      try {
        const asset = this.request.bodyJSON as IncomingAsset;

        // TODO: transform your incoming data into Hub API calls
        const payload = transformAssetToPayload(asset);
        await odp.object('cloudinary_assets', payload);

        // return the appropriate status/response
        return new Response(200);
      } catch (e: any) {
        logger.error(e);
        return new Response(500, `An unexpected error occurred: ${e}`);
      }
    }
  }
}
