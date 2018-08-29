import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccountPage } from '../account/account';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  //inject firebase authentification
  constructor(private alertCtrl: AlertController, 
    private fire: AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }
  //alert message relaying the user has successfully registered an account
  alert(message: string) {
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  //works with firebase authentification email and password criteria
  //https://firebase.google.com/docs/auth/ (Firebase authentification docs)
  register() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        this.navCtrl.setRoot(AccountPage);
        this.alert('Account has been Registered!');
      })
      //if the input entered does not match the error will display
      .catch(error => {
        this.alert(error.message);
      });
    console.log(this.email.value, this.password.value);
  }
}
