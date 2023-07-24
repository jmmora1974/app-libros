import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

import { UsuarisService } from '../../services/usuaris.service';
import { IUser } from 'src/app/models/iuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  credentials!: FormGroup;


  current_year: number = new Date().getFullYear();

  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UsuarisService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

    // easy access getters 
    get email(){ return this.credentials.get('email');}
    get password(){ return this.credentials.get('password');}
  

  ngOnInit() {

    // Setup form
    this.credentials = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  
  }

  // Sign in
  async signIn() {

    this.submit_attempt = true;

  
    // If email or password empty
    if (this.credentials.value.email == '' || this.credentials.value.password == '') {
      this.toastService.presentToast('Error', 'Please input email and password', 'top', 'danger', 2000);

    } else {
      const loading = await this.loadingController.create();
      await loading.present();

      const user = await this.authService.login(this.credentials.value);
      await loading.dismiss();

      if (user) {
        await this.userService.getUserById(this.authService.getUserId()).then((myUser: IUser) => {
          console.log('Usuario loginado correctament', myUser.id);
          this.router.navigateByUrl('/home', { replaceUrl: true });
          });
      } else {
        await this.showAlert('Login failed', 'Please try again!');
      }
      
      
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

}
