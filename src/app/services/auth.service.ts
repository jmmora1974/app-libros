import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { IEmailPwd, IUser } from '../models/iuser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private loggedIn=new BehaviorSubject<boolean>(true);
	loggedIn$=this.loggedIn.asObservable();
	private usuariLogat!:IUser;
  constructor(private auth: Auth) {}

	async register({ email, password }: IEmailPwd) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	async login({ email, password }: IEmailPwd) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	getUserId(): string {
		if (this.auth.currentUser){
			return this.auth.currentUser!.uid;
		} else {
			return '';
		}
	}

	logout() {
		return signOut(this.auth);
	}
  userLogged (): User |undefined{
		
		if (this.auth.currentUser) {
			this.loggedIn.next(true);
			console.log()
			return this.auth.currentUser as User;
		}
		else{
			this.loggedIn.next(false);
			return undefined;
		}
	  }

}
