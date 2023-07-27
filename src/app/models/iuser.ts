import { LatLng } from "@capacitor/google-maps/dist/typings/definitions";

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
    calle?: string;
    numero?: number;
    piso?: number;
    puerta?: number;
    ciudad?: string;
    pais?: string;
    ubicacion?: LatLng;
    phone?:number;
    imageUrl: string;
    avatar?: IUserAvatar;
    tokenPush: string;

}
export interface IUserAvatar {
    storagePath: string;
    storageBase64: string;
}

