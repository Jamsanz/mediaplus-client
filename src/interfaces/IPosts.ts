
import { img } from "./IMedia";

export interface IPost {
    _id?: string;
    title?: string;
    body?: string;
    createdAt?: string;
    updatedAt?: string;
    image?: img | null;
    authorName?: string;
    authorImage?: string;
}