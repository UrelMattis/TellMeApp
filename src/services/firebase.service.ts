import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class FbService {
  constructor(public afAuth: AngularFireAuth) {
  }
}