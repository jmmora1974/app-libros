export interface IEmailPwd {
    email: string;
    password: string;
}

export interface IUser  {
    
    id?:string;
    nom: string;
    cognom: string;
    email?: string;
    //password: string;
    address?: string;
    phone?:number;
    imageUrl: string;
    avatar?: IUserAvatar;
    tokenPush: string;
}
export interface IUserAvatar {
    storagePath: string;
    storageBase64: string;
}

