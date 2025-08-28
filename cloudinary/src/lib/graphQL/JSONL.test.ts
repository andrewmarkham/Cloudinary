import 'jest';
import { CloudinaryImageGraph } from './types';
import JSONL from './JSONL';


const mockIncomingAsset: CloudinaryImageGraph = {
  AltText: 'AltText',
  Width: 10,
  Height: 20,
  Url: 'http://test',
  AssetId: 'ff123',
  SizeInBytes: 40,
  displayName: 'test',
  id: 'ff123',
  language_routing: 'en',
  ContentType: ['image'],
  Status: 'Published',
  _rbac: 'r:Everyone:Read',
  __typename: 'image'
};

const assets = [mockIncomingAsset];
describe('transformAssetToPayload', () => {
  it('transforms an incoming asset to a payload', () => {
    expect(JSONL.stringify(assets))
      // eslint-disable-next-line max-len
      .toEqual('{"AltText":"AltText","Width":10,"Height":20,"Url":"http://test","AssetId":"ff123","SizeInBytes":40,"displayName":"test","id":"ff123","language_routing":"en","ContentType":["image"],"Status":"Published","_rbac":"r:Everyone:Read","__typename":"image"}');
  });
});
