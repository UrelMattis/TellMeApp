import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { Account } from '../../models/account/account.model';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {

  accountForm: FormGroup;

  account = {
    username: '',
    firstName: '',
    lastName: ''
  } as Account;

  constructor(public navCtrl: NavController,
    private firebase: FirebaseApp,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(19)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    });
  }

  createAccount() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`account/users/${auth.uid}`).set(this.account)
        .then(() => this.navCtrl.setRoot(HomePage));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
}
