import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isUserserLoggedIn$ = this.authService.loggedIn$;
  current_year: number = new Date().getFullYear();
  constructor(private router: Router, private authService:AuthService) {
  if(this.authService.userLogged()){
    this.isUserserLoggedIn$;
   }
  }
  

  goToHome(){
    this.router.navigateByUrl ('/home',{replaceUrl: true});
  }

  logOut(){
    this.authService.logout();
    this.router.navigateByUrl ('/login',{replaceUrl: true});
  }

  logIn(){
    this.router.navigateByUrl ('/login',{replaceUrl: true});
  }
  
}
