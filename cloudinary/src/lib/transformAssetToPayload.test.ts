import 'jest';
import { transformAssetToPayload } from './transformAssetToPayload';
import { CloudinaryImage } from '../data/CloudinaryImage';

const mockIncomingAsset: CloudinaryImage = {
  asset_id: '123',
  type: 'upload',
  public_id: 'test_public_id',
  format: 'jpg',
  created_at: '2025-07-11T16:36:38Z',
  width: 1870,
  height: 1250,
  bytes: 379132,
  asset_folder: '',
  secure_url: 'https://example.com/secure_image.jpg',
  version: 1752251798,
  resource_type: 'image',
  display_name: 'Test Asset',
  url: 'http://example.com/image.jpg',
  context: {
    custom: {
      alt: 'Test Alt Text',
      caption: 'Test Caption'
    }
  },
  last_updated: {
    context_updated_at: '2025-07-11T16:36:38Z',
    updated_at: '2025-07-11T16:36:38Z'
  }
};

const mockIncomingAssetWithNoMetaData: CloudinaryImage = {
  asset_id: '123',
  type: 'upload',
  public_id: 'test_public_id',
  format: 'jpg',
  created_at: '2025-07-11T16:36:38Z',
  width: 1870,
  height: 1250,
  bytes: 379132,
  asset_folder: '',
  secure_url: 'https://example.com/secure_image.jpg',
  version: 1752251798,
  resource_type: 'image',
  display_name: 'Test Asset',
  url: 'http://example.com/image.jpg'
};

describe('transformAssetToPayload', () => {
  it('transforms an incoming asset to a payload', () => {
    expect(transformAssetToPayload(mockIncomingAsset)).toEqual({
      asset_id: '123',
      type: 'upload',
      public_id: 'test_public_id',
      format: 'jpg',
      created_at: '2025-07-11T16:36:38Z',
      width: 1870,
      height: 1250,
      bytes: 379132,
      asset_folder: '',
      secure_url: 'https://example.com/secure_image.jpg',
      version: 1752251798,
      resource_type: 'image',
      display_name: 'Test Asset',
      url: 'http://example.com/image.jpg',
      alt: 'Test Alt Text',
      caption: 'Test Caption',
      last_updated: '2025-07-11T16:36:38Z'
    });
  });
});

describe('transformAssetToPayload', () => {
  it('transforms an incoming asset to a payload when no meta data', () => {
    expect(transformAssetToPayload(mockIncomingAssetWithNoMetaData)).toEqual({
      asset_id: '123',
      type: 'upload',
      public_id: 'test_public_id',
      format: 'jpg',
      created_at: '2025-07-11T16:36:38Z',
      width: 1870,
      height: 1250,
      bytes: 379132,
      asset_folder: '',
      secure_url: 'https://example.com/secure_image.jpg',
      version: 1752251798,
      resource_type: 'image',
      display_name: 'Test Asset',
      url: 'http://example.com/image.jpg',
      alt: '',
      caption: '',
      last_updated: null
    });
  });
});
