import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PhotoService } from 'src/app/services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { IUser, IUserPhoto } from 'src/app/models/iuser';
import { UsuarisService } from 'src/app/services/usuaris.service';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user: User | undefined;
  userLogat!: IUser;
  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public userService: UsuarisService,
    public authService:AuthService
    
  ) {}

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.user=this.authService.userLogged();
    this.userService.getUser().then((user: IUser) => {
      this.userLogat = user;
      console.log(this.user);
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(() => {
      this.init();
    });
  }

  public async showActionSheet(photo: IUserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }


}
