import { ObjectPayload } from '@zaiusinc/node-sdk';
import { IncomingAsset } from '../data/IncomingAssets';

/**
 * Example transformer to convert an incoming asset into a Optimizely Hub payload
 * @param asset incoming representation of a asset
 */
export function transformAssetToPayload(asset: IncomingAsset): ObjectPayload {
  return {
    asset_id: asset.id,
    asset_name: asset.name,
    asset_url: asset.url,
  };
}
