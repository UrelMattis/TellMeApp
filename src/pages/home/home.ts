import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ManagePage } from '../manage/manage';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private collection: string = "Record";
  private document: string = "Xy76Re34SdFR1";
  private result: any;
  public lists: any;

  constructor(public navCtrl: NavController,
    private _DB: DatabaseProvider,
    private _ALERT: AlertController) {
    this.result = {
      name: "Example Name",
      birthplace: "Example Birthplace",
      education: "High School Diploma",
      age: "23",
      hobbies: "Basketball, Football, Computer Programming",
      occupation: "Software Developer",
      favColor: "Blue",
      personalS: "Hardworking",
      personalW: "Too hard on myself"
    };
  }

  ionViewDidEnter() {
    this.retrieveCollection();
  }

  generateCollectionAndDocument(): void {
    this._DB.createAndPopulateDocument(this.collection,
      this.document,
      this.result)
      .then((data: any) => {
        console.dir(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  retrieveCollection(): void {
    this._DB.getDocuments(this.collection)
      .then((data) => {
        if (data.length === 0) {
          this.generateCollectionAndDocument();
        } else {
          this.lists = data;
        }
      })
      .catch();
  }

  add(): void {
    this.navCtrl.push(ManagePage);
  }

  update(obj): void {
    let params: any = {
      collection: this.collection,
      location: obj
    };
    this.navCtrl.push(ManagePage,
      {
        record: params,
        isEdited: true
      });
  }

  delete(obj): void {
    this._DB.delete(this.collection,
      obj.id)
      .then((data: any) => {
        this.displayAlert('Success', 'The record ' + obj.name + ' was removed.');
      })
      .catch((error: any) => {
        this.displayAlert('Error', error.message);
      });
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.retrieveCollection();
        }
      }]
    });
    alert.present();
  }

  openSettings(){
    this.navCtrl.push(SettingsPage);
  }
}
