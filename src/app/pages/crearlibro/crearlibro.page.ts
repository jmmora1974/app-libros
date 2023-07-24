import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from 'src/app/services/auth.service';
import { Auth, UserCredential, User, provideAuth } from '@angular/fire/auth';
import { LoadingController, AlertController } from '@ionic/angular';
import { UsuarisService } from '../../services/usuaris.service';
import { IUser } from 'src/app/models/iuser';
import { ILibro } from '../../models/ilibro';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-crearlibro',
  templateUrl: './crearlibro.page.html',
  styleUrls: ['./crearlibro.page.scss'],
})
export class CrearlibroPage implements OnInit {

  user!: User;

  formLibro!: FormGroup;
  nuevoLibro:ILibro={
    titulo: '',
    categoria: '',
    descripcion: '',
    valoracion: 0,
    precio: 0,
    imageUrl: "https://ionicframework.com/docs/img/demos/card-media.png",
    id: '',
    propietario: this.authService.getUserId()
  };
  userLogat$=this.userService.userLogat$;

  constructor(
    private librosService: LibrosService,
    private router: Router,
    public fb: FormBuilder,
    private userService: UsuarisService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    //private auth:Auth,
    public photoService: PhotoService,
    
 
  ) {
    this.user= this.authService.userLogged()!;
    console.log(this.user.uid)
    //console.log (this.auth.app)
  }
   ngOnInit() {
    console.log(this.authService.getUserId())
 
  this.nuevoForm();
  }

  nuevoForm (){
    this.formLibro = this.fb.group({
      imageUrl:[this.nuevoLibro.imageUrl ],
      titulo: ['', [Validators.required]],
      categoria: ['',[Validators.required]],
      descripcion:['',[Validators.required]],
      valoracion: ['',[Validators.required]],
      precio: ['',[Validators.required]],
      propietario: [this.authService.getUserId(),[Validators.required] ]
    });
  }
  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.user!=this.authService.userLogged();
   /* this.userService.getUser().then((user: IUser) => {
      this.userLogat = user;
      console.log(this.user);
      console.log(user);
    });*/
    this.nuevoLibro.imageUrl= "https://ionicframework.com/docs/img/demos/card-media.png";
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(() => {
      this.init();
    });
  }
  get titulo () {
    return this.formLibro.get('titulo');
  }

  get categoria () {
    return this.formLibro.get('categoria');
  }

  get descripcion () {
    return this.formLibro.get('descripcion');
  }
  get valoracion () {
    return this.formLibro.get('valoracion');
  }
  get precio () {
    return this.formLibro.get('precio');
  }

  get propietario () {
    return this.formLibro.get('propietario');
  }

  async onFormSubmit() {
    const loading = await this.loadingController.create();
    
    await loading.present();
   
    if (!this.formLibro.valid) {
      console.log(this.formLibro.value)
      this.showAlert('Registro fallido', 'Por favor, introduzca todos los datos');
      await loading.dismiss();
      return false;
    } else {
      console.log(this.formLibro);
      await loading.dismiss();
      this.nuevoLibro={
        titulo: this.formLibro.get('titulo')!.value,
        categoria:this.formLibro.get('categoria')!.value,
        descripcion: this.formLibro.get('descripcion')!.value,
        valoracion: this.formLibro.get('valoracion')!.value,
        precio:this.formLibro.get('precio')!.value,
        propietario: this.authService.getUserId(),
        imageUrl: this.nuevoLibro.imageUrl
      };
      console.log(this.nuevoLibro)
      return this.librosService
        .createLibro(this.nuevoLibro)
        .then((res) => {
          console.log(res)
          this.formLibro.reset();
         this.nuevoForm();
          this.router.navigate(['/']);
        })
        .catch((error) => console.log(error));
    }
    
  }
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

      const result = await this.photoService.uploadImageLibro(image);
     
      
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload fallido',
          message: 'Ha ocurrido un fallo al subir la foto del libr.',
          buttons: ['OK'],
        })
        await alert.present();
      } else{
        this.nuevoLibro.imageUrl=result;
        
      }
    }
    
  }
  async showAlert (header:string, message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }



}
