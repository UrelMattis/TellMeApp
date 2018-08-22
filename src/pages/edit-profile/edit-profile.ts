import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  @ViewChild('displayChange') displayChange;
  @ViewChild('emailChange') emailChange;
  @ViewChild('newPassChange') newPassChange;
  @ViewChild('confirmPassChange') confirmPassChange;
  userID = this.fire.auth.currentUser.uid;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private fire: AngularFireAuth) {
    console.log(this.fire.auth.currentUser);
  }

  profileAlert(message: string) {
    this.alertCtrl.create({
      title: "Settings",
      subTitle: message,
      buttons: ['Dismiss']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateProfile() {
    if (this.displayChange.value.length < 1 && this.emailChange.value.length < 1 && this.newPassChange.value.length < 1) {
      this.profileAlert("No changes have been made!");
      this.navCtrl.setRoot(HomePage);
    }
    if (this.displayChange.value.length > 0) {
      this.updateDisplayName();
      this.navCtrl.setRoot(HomePage);
    }
    if (this.emailChange.value.length > 0) {
      this.updateProfileEmail();
      this.navCtrl.setRoot(HomePage);
    }
    if (this.newPassChange.value.length > 0) {
      if (this.newPassChange.value == this.confirmPassChange.value) {
        this.updateProfilePassword();
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.profileAlert("Your entered passwords are different!");
      }
    }
  }

  updateProfilePassword() {
    this.fire.auth.currentUser.updatePassword(this.newPassChange.value)
      .then(data => {
        console.log(data);
        this.profileAlert("Profile has been successfully updated!");
      })
      .catch(error => {
        console.log(error);
        this.profileAlert("Invalid password entry!");
      });
  }

  updateProfileEmail() {
    this.fire.auth.currentUser.updateEmail(this.emailChange.value)
      .then(data => {
        console.log(data);
        this.profileAlert("Profile has been successfully updated!");
      })
      .catch(error => {
        console.log(error);
        this.profileAlert("Invalid email entry!");
      });
  }
  updateDisplayName() {
    if (this.displayChange.value.length > 3 && this.displayChange.value.length < 20 && this.displayChange.value.match("[a-zA-Z]+")) {
      var ref = firebase.database().ref(`account/users/${this.userID}`).update({ username: this.displayChange.value });
      this.profileAlert("Your display name has been successfully updated!");
    }
    else {
      this.profileAlert("Your display name is invalid! Please enter a new display name.");
    }
  }
}
