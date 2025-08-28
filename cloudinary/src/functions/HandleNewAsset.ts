import { logger, Function, Response } from '@zaiusinc/app-sdk';
import { odp } from '@zaiusinc/node-sdk';
import { transformNotificationToPayload } from '../lib/transformAssetToPayload';
import { CloudinaryImageUploadNotification } from '../data/CloudinatyImageUploadNotification';
import HttpClient from '../lib/client/httpClient';
import { CloudinaryImageGraph } from '../lib/graphQL/types';

export class HandleNewAsset extends Function {
  /**
   * Handle a request to the handle_incoming_object function URL
   * this.request contains the request information
   * @returns Response as the HTTP response
   */
  public async perform(): Promise<Response> {

    const notifcation = this.request.bodyJSON as CloudinaryImageUploadNotification;

    if (!notifcation?.asset_id) {
      return new Response(400, 'Unable to process request, invalid notification');
    } else {
      try {

        // const payload = transformNotificationToPayload(notifcation);
        // await odp.object('cloudinary_image', payload);

        const client = new HttpClient({
          username: 'V0pfAnPxHo3rTrQMuD2kIrzW5jj4GYjB4FgJB0UtXQxWTvbV',
          password: '5fb+Fy2LnJvpV2sJW9sSMOohnto8W4fRFayu8gYLiENEGkS6bMo0Sepo7WLIKnRj',
        });

        const url = `https://prod.cg.optimizely.com/api/content/v2/data?id=${notifcation.asset_id}`;
        const imageData: CloudinaryImageGraph = {
          AltText: notifcation.context?.custom?.alt || '',
          Width: notifcation.width || 0,
          Height: notifcation.height || 0,
          Url: notifcation.url,
          AssetId: notifcation.asset_id,
          SizeInBytes: notifcation.bytes || 0,
          displayName: notifcation.display_name || '',
          id: notifcation.asset_id,
          language_routing: 'en',
          ContentType: ['cloudinaryImageMedia'],
          Status: 'Published',
          _rbac: 'r:Everyone:Read',
          __typename: 'cloudinaryImageMedia'
        };

        await client.post(url, imageData);

        // return the appropriate status/response
        return new Response(200);
      } catch (e: any) {
        logger.error(e);
        return new Response(500, `An unexpected error occurred: ${e}`);
      }
    }
  }
}
