import { Inject, Injectable } from '@angular/core';
import { ILibro } from '../models/ilibro';
import { AuthService } from './auth.service';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDocs, query, updateDoc, where, getFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, identity } from 'rxjs';
import { User } from '@angular/fire/auth';
import { getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  usuariaLogat: User | undefined;
  //libros:ILibro[]=[];
  private libros=new BehaviorSubject<ILibro[]>([]);
  libros$=this.libros.asObservable();
  
  private librospropietari=new BehaviorSubject<ILibro[]>([]);
	librospropietari$=this.librospropietari.asObservable();
  private misLibros:ILibro[]=[];
  constructor(
    private authService: AuthService,
    private firestore: Firestore
    ) {
     
     this.libros$=this.getLibros();
    
      
  }
  // Crea un nuevo libro
  createLibro(libro: ILibro) {
    
    const librosRef = collection(this.firestore, 'libros');
    
    const libronuevo=addDoc(librosRef, libro);
    
    return libronuevo;
  }
  
  // Obtiene el libro por su id.
  getLibrobyId(id: string) {
    const LibroDocRef = doc(this.firestore, `libros/${id}`);

    return docData(LibroDocRef, { idField: 'id' }) as Observable<ILibro>;
  }

   // Obtiene los libros del propietario.


  async getLibrobyPropietario(prop: string){
    //this.misLibros=[];
        this.libros$.forEach((elements)=>{
        this.misLibros=[];
          //console.log (elements.length)
          for (let x=0;x<elements.length;x++){
          //  console.log(elements[x])
           // console.log(elements[x].propietario==prop)
            if (elements[x].propietario==prop){
              this.misLibros.push(elements[x])
             // console.log(this.misLibros)
            }
          }
          if (this.misLibros) { 
            console.log(this.misLibros)
              this.librospropietari.next(this.misLibros);
            
          }
        });
         
  }

   async getLibrobyPropietario1(userProp: string):Promise<any> {
    
    const q = query(collection(this.firestore, 'libros'), where('propietario', '==', userProp));
    const querySnapshot = await getDocs(q);
     let libros2 =  querySnapshot.docs.map(doc => doc.data() as ILibro);
   
   //
    console.log(JSON.stringify(libros2));
    if (libros2) { return  libros2;}
    else {
      setTimeout(() =>{
      //  console.log(JSON.stringify(libros2));
        return libros2;
      },2000)
      return libros2
     }
   // return  querySnapshot.docs.map(doc => doc.data() as ILibro);
  }
  
  // Obtiene los libros comprados.
  async getLibrobyComprador1(userComp: string) {
    const q = query(collection(this.firestore, 'libros'), where('comprador`', '==', userComp));
    const querySnapshot = await getDocs(q);
    let libros = querySnapshot.docs.map(doc => doc.data() as ILibro);
    return libros;
  }

  // Obtiene los libros comprados.
  async getLibrobyComprador(userComp: string) {
/*
    return this.getLibros().subscribe({
      next: 
      (data:ILibro[])=> {
       return data;

      },
      error: (error) => {
      // Handle errors
      console.error(error);
      return error;
      }
    });
     */
  }



  // Obtiene la lista de libros
  getLibros() {
    const librosRef = collection(this.firestore, 'libros');
    
    return collectionData(librosRef, { idField: 'id'}) as Observable<ILibro[]>;
  }

  // Actualiza un libro
  updateLibro( libro: ILibro) {
    const vacancaDocRef = doc(this.firestore, `libros/${libro.id}`);
    return updateDoc(vacancaDocRef, {
      titulo: libro.titulo,
      categoria: libro.categoria,
      descripcion: libro.descripcion,
      valoracion: libro.valoracion,
      precio: libro.precio   
    });
  }
  // Borra el libro
  deleteLibro(libro: ILibro) {
    console.log(libro)
    const vacancaDocRef = doc(this.firestore, `libros/${libro.id}`);
    return deleteDoc(vacancaDocRef);
  }
}
