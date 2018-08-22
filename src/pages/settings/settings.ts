import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FbService } from '../../services/firebase.service';
import { EditProfilePage } from '../edit-profile/edit-profile';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  usernameStorage: string;
  userID: string;
  username: string;
  firstName: string;
  lastName: string;
  fNHolder: string;
  lnHolder: string;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth) {
    console.log(this.fire.auth.currentUser);
    this.userID = fire.auth.currentUser.uid;
    var ref = firebase.database().ref(`account/users/${this.userID}`);
    ref.once('value', (snapshot) => {
      var id = snapshot.val().username;
      this.usernameStorage = id;
    });
    var ref = firebase.database().ref(`account/users/${this.userID}`);
    ref.once('value', (snapshot) => {
      var id = snapshot.val().firstName;
      this.fNHolder = id;
    });
    var ref = firebase.database().ref(`account/users/${this.userID}`);
    ref.once('value', (snapshot) => {
      var id = snapshot.val().lastName;
      this.lnHolder = id;
    });
    this.email = fire.auth.currentUser.email;
  }
  goToEditProfile(params) {
    if (!params) params = {};
    this.navCtrl.push(EditProfilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
}
