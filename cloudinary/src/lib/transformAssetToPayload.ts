import { ObjectPayload } from '@zaiusinc/node-sdk';

import { CloudinaryImage } from '../data/CloudinaryImage';

/**
 * Example transformer to convert an incoming asset into a Optimizely Hub payload
 * @param asset incoming representation of a asset
 */
export function transformAssetToPayload(asset: CloudinaryImage): ObjectPayload {
  return {
    asset_id: asset.asset_id,
    type: asset.type,
    public_id: asset.public_id,
    format: asset.format,
    created_at: asset.created_at,
    width: asset.width,
    height: asset.height,
    bytes: asset.bytes,
    asset_folder: asset.asset_folder || '',

    secure_url: asset.secure_url,

    version: asset.version,

    resource_type: asset.resource_type,

    display_name: asset.display_name,
    url: asset.url,
    alt: asset.context?.custom?.alt || '',
    caption: asset.context?.custom?.caption || '',
    last_updated: asset.last_updated?.updated_at || null
  };
}

