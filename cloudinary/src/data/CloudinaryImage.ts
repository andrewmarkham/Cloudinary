export interface CloudinaryImage {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    asset_folder: string;
    display_name: string;
    url: string;
    secure_url: string;
    context?:  Context;
    last_updated?: LastUpdated;
}

export interface Context {
    custom: {
        alt: string;
        caption: string;
    };
};

export interface LastUpdated {
    context_updated_at: string;
    updated_at: string;
};
