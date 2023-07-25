import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { IUser } from 'src/app/models/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UsuarisService } from 'src/app/services/usuaris.service';

import { ModalLibroPage } from './modal-libro/modal-libro.page';
import { ILibro } from 'src/app/models/ilibro';
import { error } from 'console';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user!: User;
  userLogat!: IUser;
  profile: any;
  formperfil!: FormGroup;
  libros$=this.librosService.libros$;
  misLibros$=this.librosService.librospropietari$;
  librosVendidos: ILibro[]=[];
  librosVendidos$=this.librosService.librosVendidos$;
  librosComprados: ILibro[]=[];
  message='Los cambios del libro son:'
  constructor( 
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public userService: UsuarisService,
    public librosService:LibrosService,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) { 
    this.photoService.getUserProfile().subscribe((data) => {
      this.profile = data;
      
    });
   

  }

  ngOnInit() {
    this.userService.getUser().then ((usu)=>{
     // console.log (usu);
      this.userLogat=usu;   
    }).then(()=>
      this.librosService.getLibrobyPropietario(this.userLogat.id!).then ((lib)=>{
           this.formperfil = this.fb.group ({
            nom: [this.userLogat!.nom, [Validators.required]],
            cognom: [this.userLogat!.cognom,[Validators.required]],
            imageUrl:[this.userLogat!.imageUrl],
            tokenPush: [this.userLogat!.tokenPush]
          }); 
          this.librosService.getLibrobyComprador(this.userLogat.id!).then((data)=>{
            this.librosComprados=data;
          });
      
          this.librosService.getLibrobyVendidos(this.userLogat.id!).then((data)=>{
            this.librosVendidos=data;
          });

      })
      .catch((error)=>{console.error})      
    );
   
  }
  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.user!=this.authService.userLogged();
    this.userService.getUser().then((user: IUser) => {
      this.userLogat = user;
      console.log(this.user);
      console.log(user);
      this.formperfil = this.fb.group ({
        nom: [this.userLogat!.nom, [Validators.required]],
        cognom: [this.userLogat!.cognom,[Validators.required]],
        imageUrl:[this.userLogat!.imageUrl],
        tokenPush: [this.userLogat!.tokenPush]
  
      });

    });
     
    
  }

  //Actualiza los datos del perfil y la foto del avatar.
  actualizaPerfil(){
    console.log(this.formperfil.value)
    const userP:IUser ={
      nom: this.formperfil.get('nom')?.value,
      cognom: this.formperfil.get('cognom')?.value,
      imageUrl:this.formperfil.get('imageUrl')?.value,
      tokenPush:this.formperfil.get('tokenPush')?.value,
    }

   this.userService.updateUser(userP)
    
  }
  //Abre una ventana modal con el formulario de libro para realizar modificaciones o cambio de foto.
  async openModal(libro:ILibro) {
    const modal = await this.modalCtrl.create({
      component: ModalLibroPage,
      componentProps: libro
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.librosService.updateLibro(data)
    }
  }
  //Borra el libro
  deleteLibro(libro:any){
    console.log (libro)
      this.librosService.deleteLibro(libro);
  }
  
  //Añade fotos en la galeria de fotos del libro..//sin usar de momento
  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(() => {
      this.init();
    });
  }

  get nom () {
    return this.formperfil.get('nom')?.value;
  }
  get cognom () {
    return this.formperfil.get('cognom');
  }
  
  //Obtiene la lista de libros vendidos.

  // Sign out
  async signOut() {
    try {
      console.log('logged out');
      await this.authService.logout().then(() => {
        this.router.navigate(['login']);
      });
      
    } catch (error) {
         
      this.showAlert('LogOut failed', 'Please try again');
    
    }
  }

    // show alert method 
    async showAlert(header:string, message:string) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK'],
      });
      await alert.present();
    } 
    //Cambia la foto avatar
    
  async changeImage() {
      const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera, // Camera, Photos or Prompt!
      });
  
      if (image) {
        const loading = await this.loadingController.create();
        await loading.present();
  
        const result = await this.photoService.uploadImage(image);
        loading.dismiss();
  
        if (!result) {
          const alert = await this.alertController.create({
            header: 'Upload failed',
            message: 'There was a problem uploading your avatar.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
      this.router.navigateByUrl ('tabs/perfil',{replaceUrl: true});
    }
  
    async returnHome (){
    
      this.router.navigateByUrl ('/',{replaceUrl: true});
    
  }

}
