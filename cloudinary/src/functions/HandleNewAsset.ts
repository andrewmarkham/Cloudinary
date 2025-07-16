import { logger, Function, Response } from '@zaiusinc/app-sdk';
import { odp } from '@zaiusinc/node-sdk';
import { transformNotificationToPayload } from '../lib/transformAssetToPayload';
import { CloudinatyImageUploadNotification } from '../data/CloudinatyImageUploadNotification';

export class HandleNewAsset extends Function {
  /**
   * Handle a request to the handle_incoming_object function URL
   * this.request contains the request information
   * @returns Response as the HTTP response
   */
  public async perform(): Promise<Response> {

    const notifcation = this.request.bodyJSON as CloudinatyImageUploadNotification;

    if (!notifcation?.asset_id) {
      return new Response(400, 'Unable to process request, invalid notification');
    } else {
      try {

        const payload = transformNotificationToPayload(notifcation);
        await odp.object('cloudinary_image', payload);

        // return the appropriate status/response
        return new Response(200);
      } catch (e: any) {
        logger.error(e);
        return new Response(500, `An unexpected error occurred: ${e}`);
      }
    }
  }
}
