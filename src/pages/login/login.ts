import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //get access to the email and password a components and its methods
  @ViewChild('email') email;
  @ViewChild('password') password;
  usernameID: string;

  //inject firebase authentification
  constructor(private alertCtrl: AlertController, 
    private fire: AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController) {
    
      this.menu.swipeEnable(false);
  }

  //alert message relaying that the user has logged in successfully
  alert(message: string) {
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkAccount() {
    this.usernameID = this.fire.auth.currentUser.uid;
    var ref = firebase.database().ref(`account/users/${this.usernameID}`);
    ref.once('value', (snapshot) => {
      if (snapshot.hasChild('username')) {
        this.navCtrl.setRoot(HomePage);
        this.alert('Login was successful!');
      } else {
        this.fire.auth.signOut();
        this.alert('This is not a personal account!');
      }
    });
  }

  //push the page to the register page if an acount does not exist
  register() {
    this.navCtrl.push(RegisterPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
  //set root to home page once the user is authenticated
  //works with firebase authentification email and password criteria
  //https://firebase.google.com/docs/auth/ (Firebase authentification docs)
  signIn() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        this.checkAccount();
      })
      //if the input entered does not match the error will display
      .catch(error => {
        this.alert(error.message);
      })
    console.log(this.email.value, this.password.value);
  }
}
