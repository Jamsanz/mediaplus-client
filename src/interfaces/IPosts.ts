
import IResource from "./IResource";
import IAuthor from "./IAuthor";
import { img } from "./IMedia";

export interface IPost {
    _id?: string;
    title?: string;
    body?: string;
    createdAt?: string;
    updatedAt?: string;
    resource?: IResource;
    image?: img | null;
    page?: 'details' | 'blog' | 'preview';
    author?: IAuthor
}