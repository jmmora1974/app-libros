import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, doc, docData, Firestore, getDocs, limit, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { UsuarisService } from '../services/usuaris.service';
import { IUser } from '../models/iuser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  userLogat!: IUser;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private userService:UsuarisService,
    private  authService:AuthService
  ) {

    this.userService.getUser().then ((usu)=>{
      console.log (usu);
      this.userLogat=usu;
      
    })
    
  }
  //Obtiene de la bdd el perfil de usuario segun el current user
  getUserProfile() {
    const user = this.auth.currentUser;

    const userDocRef = doc(this.firestore, `users/${this.userLogat!.id}`);
    return docData(userDocRef);
  }

  //Sube una foto de camara o archivo al storage
  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `usuaris/${this.userLogat!.id}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      
      const q = query(collection(this.firestore, "users"), where("id", "==", this.authService.getUserId()), limit(1));
      const querySnapshot = await getDocs(q);
      const userDocRef1 = querySnapshot.docs.map(doc => doc);
      console.log(userDocRef1[0].ref)

      const userDocRef = doc(this.firestore, `users/${this.userLogat!.id}`);
      await updateDoc(userDocRef1[0].ref, {
        imageUrl,
      });
      return true;
    } catch (e) {
      return null;
    }
  }
}
