interface graphContentBase {
    'id': string;
    'language_routing': 'en';
    ContentType: string[];
    Status: 'Published';
    '_rbac': 'r:Everyone:Read';
    '__typename': string;
}

export interface CloudinaryImageGraph extends graphContentBase {
    AltText: string;
    Width: number;
    Height: number;
    Url: string;
    AssetId: string;
    SizeInBytes: number;
    displayName: string;
};
