import 'jest';
import { odp } from '@zaiusinc/node-sdk';
import { HandleIncomingObject } from './HandleIncomingObject';

jest.mock('@zaiusinc/node-sdk');

const mockRequest = {
  params: {
    id: '123',
  },
  bodyJSON: {
    id: '123',
    name: 'Test Asset',
    url: 'https://example.com',
  },
};

describe('HandleAsset', () => {
  it('generates a asset creation', async () => {
    const handler = new HandleIncomingObject(mockRequest as any);
    await handler.perform();
    expect(odp.object).toHaveBeenCalledWith('cloudinary_assets', {
      asset_id: '123',
      asset_name: 'Test Asset',
      asset_url: 'https://example.com',
    });
  });
});
