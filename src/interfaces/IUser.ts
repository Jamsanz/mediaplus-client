export interface IUser {
    _id?: string;
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    createdAt?: string;
    status?: 'Resolved' | 'Pending' | 'In-Progress' | 'New';
    service?: string
}