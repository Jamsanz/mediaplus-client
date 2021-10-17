export interface IUser{
    name: string;
    phone: string;
    email?: string;
    message:string;
    status: 'Resolved' | 'Pending' | 'In-Progress' | 'New';
    service: string  
}