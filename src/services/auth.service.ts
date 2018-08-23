import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import 'rxjs/add/operator/toPromise';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
	private user: firebase.User;
	private businessListref = this.db.list<Account>('list');

	constructor(public afAuth: AngularFireAuth,
	private db: AngularFireDatabase) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}
	resetPassword(email: string) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}
	getBusinessList() {
		return this.businessListref;
	  }
}