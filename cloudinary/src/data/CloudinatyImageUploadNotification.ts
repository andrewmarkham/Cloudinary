import { Context, LastUpdated } from './CloudinaryImage';

export interface CloudinaryImageUploadNotification {
  notification_type: string;
  timestamp: string;
  request_id: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  original_extension: string;
  api_key: string;
  context?:  Context;
  last_updated?: LastUpdated;
  notification_context: {
    triggered_at: string;
    triggered_by: {
      source: string;
      id: string;
    };
  };
  signature_key: string;
}
