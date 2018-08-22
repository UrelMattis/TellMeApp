import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}
	resetPassword(email: string) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}
}