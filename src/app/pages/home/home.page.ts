import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';
import { ILibro } from 'src/app/models/ilibro';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  libros$=this.librosService.libros$;
  
  constructor(
    private librosService: LibrosService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    
  ) {
    setTimeout(() => {
      this.authService.userLogged()
    }, 2000);
  }
  ngOnInit(): void {
      
  }
  comprarLibro (libro:ILibro){
    console.log(libro)
    const res = this.librosService.comprarLibro(libro);
    console.log (res)
  }

}
