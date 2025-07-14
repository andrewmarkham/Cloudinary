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
    context: {
        custom: {
            alt: string;
            caption: string;
        };
    };
    last_updated: {
        context_updated_at: string;
        updated_at: string;
    };
}
