import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL, AlertController, Nav } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginPage } from '../login/login';
import { FirebaseImageService } from '../../services/firebase.service';
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
  employeePhoto;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: AngularFireAuth,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    public fbimageService: FirebaseImageService) {

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

  goToEditProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  openImagePickerCrop() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.cropService.crop(results[i], { quality: 75 }).then(
                  newImage => {
                    this.uploadImageToFirebase(newImage);
                  },
                  error => console.error("Error cropping image", error)
                );
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  uploadImageToFirebase(image) {
    image = normalizeURL(image);

    this.fbimageService.uploadImage(image)
      .then(photoURL => {
        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      })
  }

  getPhotoURL(image) {
    firebase.storage().ref().child('images/' + image + '.jpg').getDownloadURL().then((url) => {
      this.employeePhoto = url;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
}
