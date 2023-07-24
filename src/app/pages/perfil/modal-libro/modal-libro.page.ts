import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { ILibro } from 'src/app/models/ilibro';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-modal-libro',
  templateUrl: './modal-libro.page.html',
  styleUrls: ['./modal-libro.page.scss'],
})
export class ModalLibroPage {
  formLibro!: FormGroup;
  nuevoLibro:ILibro={
    titulo: '',
    categoria: '',
    descripcion: '',
    valoracion: 0,
    precio: 0,
    propietario: ''
  };
  
  constructor(
    private modalCtrl: ModalController,
    private photoService: PhotoService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public fb: FormBuilder,navParams: NavParams) { 
    this.nuevoLibro={
      titulo: navParams.get('titulo'),
      categoria: navParams.get('categoria'),
      descripcion: navParams.get('descripcion'),
      valoracion: navParams.get('valoracion'),
      precio: navParams.get('precio'),
      propietario: navParams.get('propietario'),
      imageUrl:navParams.get('imageUrl'),
      id: navParams.get('id'),
    };
    this.formLibro = this.fb.group({
      imageUrl:[this.nuevoLibro.imageUrl ],
      titulo: [this.nuevoLibro.titulo, [Validators.required]],
      categoria: [this.nuevoLibro.categoria ,[Validators.required]],
      descripcion:[this.nuevoLibro.descripcion ,[Validators.required]],
      valoracion: [this.nuevoLibro.valoracion,[Validators.required]],
      precio: [this.nuevoLibro.precio ,[Validators.required]],
      propietario: [this.nuevoLibro.propietario ,[Validators.required] ],
      id: [this.nuevoLibro.id ,[Validators.required] ],
    });
  }

 
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.formLibro.value, 'confirm');
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
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        this.nuevoLibro.imageUrl=result;
        this.formLibro.get('imageUrl')?.setValue(result);
        console.log (this.formLibro)
      }
    }
   
  }


}
