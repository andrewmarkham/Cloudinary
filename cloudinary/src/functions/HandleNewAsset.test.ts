/* eslint-disable eol-last */
/* eslint-disable spaced-comment */
import 'jest';
import { odp } from '@zaiusinc/node-sdk';
import { HandleNewAsset } from './HandleNewAsset';

jest.mock('@zaiusinc/node-sdk');

const mockRequest = {
  bodyJSON: {
    'notification_type': 'upload',
    'timestamp': '2025-07-14T19:24:12+00:00',
    'request_id': '75637b560527efa0d959e79c4a25b70a',
    'asset_id': 'bec532b245c28572a6ee7c655e05ef46',
    'public_id': 'IMG_2594_ysj8tw',
    'version': 1752521051,
    'version_id': '27ac8ba533aba471b9a0b7ec4c7b6934',
    'width': 4032,
    'height': 3024,
    'format': 'jpg',
    'resource_type': 'image',
    'created_at': '2025-07-14T19:24:11Z',
    'tags': [],
    'bytes': 1520972,
    'type': 'upload',
    'etag': '765a480cfe966d5e23654b450d95cc96',
    'placeholder': false,
    'url': 'http://res.cloudinary.com/dcoqw592t/image/upload/v1752521051/IMG_2594_ysj8tw.jpg',
    'secure_url': 'https://res.cloudinary.com/dcoqw592t/image/upload/v1752521051/IMG_2594_ysj8tw.jpg',
    'asset_folder': '',
    'display_name': 'IMG_2594_ysj8tw',
    'original_filename': 'IMG_2594',
    'original_extension': 'jpeg',
    'api_key': '584152236834577',
    'notification_context': {
      'triggered_at': '2025-07-14T19:24:11.797164Z',
      'triggered_by': {
        'source': 'api',
        'id': '584152236834577'
      }
    },
    'signature_key': '826373479195239'
  },
};

describe('HandleAsset', () => {
  it('generates a asset creation', async () => {
    const handler = new HandleNewAsset(mockRequest as any);
    await handler.perform();
    expect(odp.object).toHaveBeenCalledWith('cloudinary_image', {
      asset_id: 'bec532b245c28572a6ee7c655e05ef46',
      type: 'upload',
      public_id: 'IMG_2594_ysj8tw',
      format: 'jpg',
      created_at: '2025-07-14T19:24:11Z',
      width: 4032,
      height: 3024,
      bytes: 1520972,
      asset_folder: '',
      secure_url: 'https://res.cloudinary.com/dcoqw592t/image/upload/v1752521051/IMG_2594_ysj8tw.jpg',
      version: 1752521051,
      resource_type: 'image',
      display_name: 'IMG_2594_ysj8tw',
      url: 'http://res.cloudinary.com/dcoqw592t/image/upload/v1752521051/IMG_2594_ysj8tw.jpg',
      alt: '',
      caption: '',
      last_updated: null
    } as any);
  });
});

