import 'jest';
import { transformAssetToPayload } from './transformAssetToPayload';

const mockIncomingAsset = {
  id: '123',
  name: 'Test Asset',
  url: 'https://example.com',
};

describe('transformAssetToPayload', () => {
  it('transforms an incoming asset to a payload', () => {
    expect(transformAssetToPayload(mockIncomingAsset)).toEqual({
      asset_id: '123',
      asset_name: 'Test Asset',
      asset_url: 'https://example.com',
    });
  });
});
