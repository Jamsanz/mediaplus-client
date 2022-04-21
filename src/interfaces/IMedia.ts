export interface IImage {
    public_id: string;
    version: string;
    secure_url: string;
}

export interface img {
    data: string;
    type: string;
    fileName: string;
}

export type Image = {
    public_id: string,
    version: string,
    secure_url: string,
}