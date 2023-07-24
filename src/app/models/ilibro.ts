export interface ILibro {
    id?:string;
    titulo: string,
    categoria: string,
    descripcion: string,
    valoracion: number,
    precio: number,
    propietario:string,
    comprador?:string,
    imageUrl?:string
    galeriaFotos?: IUserPhoto[]

}
export interface IUserPhoto {
    filepath: string;
    webviewPath?: string;
}