import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class FirebaseImageService {
  userID: string;

  constructor(private fire: AngularFireAuth) {
    this.userID = fire.auth.currentUser.uid;
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var canvasV = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var encode: any = this;
      c.width = encode.width;
      c.height = encode.height;
      canvasV.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL)
          }, err => {
            reject(err);
          })
      })
    })
  }
}