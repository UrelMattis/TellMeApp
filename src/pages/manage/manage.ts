import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormBuilder } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  public form: any;
  public records: any;
  public name: string = '';
  public birthplace: string = '';
  public education: string = '';
  public age: string = '';
  public hobbies: string = '';
  public occupation: string = '';
  public favColor: string = '';
  public personalS: string = '';
  public personalW: string = '';
  public docID: string = '';
  public isEditable: boolean = false;
  public title: string = 'Add a New Record';
  private _COLL: string = "Record";

  constructor(public navCtrl: NavController,
    public params: NavParams,
    private _FB: FormBuilder,
    private _DB: DatabaseProvider,
    private _ALERT: AlertController) {

    this.form = _FB.group({
      'name': ['', Validators.required],
      'birthplace': ['', Validators.required],
      'education': ['', Validators.required],
      'age': ['', Validators.required],
      'hobbies': ['', Validators.required],
      'occupation': ['', Validators.required],
      'favColor': ['', Validators.required],
      'personalS': ['', Validators.required],
      'personalW': ['', Validators.required]
    });

    if (params.get('isEdited')) {
      let record = params.get('record');
      this.name = record.location.name;
      this.birthplace = record.location.birthplace;
      this.education = record.location.education;
      this.age = record.location.age;
      this.hobbies = record.location.hobbies;
      this.occupation = record.location.occupation;
      this.favColor = record.location.favColor;
      this.personalS = record.location.personalS;
      this.personalW = record.location.personalW;
      this.docID = record.location.id;
      this.isEditable = true;
      this.title = 'Update Document';
    }
  }

  saveDocument(val: any): void {
    let name: string = this.form.controls["name"].value,
      birthplace: string = this.form.controls["birthplace"].value,
      education: string = this.form.controls["education"].value,
      age: string = this.form.controls["age"].value,
      hobbies: string = this.form.controls["hobbies"].value,
      occupation: string = this.form.controls["occupation"].value,
      favColor: string = this.form.controls["favColor"].value,
      personalS: string = this.form.controls["personalS"].value,
      personalW: string = this.form.controls["personalW"].value;

    // If we are editing an existing record then handle this scenario
    if (this.isEditable) {

      this._DB.update(this._COLL,
        this.docID,
        {
          name: name,
          birthplace: birthplace,
          education: education,
          age: age,
          hobbies: hobbies,
          occupation: occupation,
          favColor: favColor,
          personalS: personalS,
          personalW: personalW
        })
        .then((data) => {
          this.clearForm();
          this.displayAlert('Success', 'The document ' + name + ' was updated in the DB.');
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error) => {
          this.displayAlert('Updating document failed', error.message);
        });
    }

    else {

      this._DB.add(this._COLL,
        {
          name: name,
          birthplace: birthplace,
          education: education,
          age: age,
          hobbies: hobbies,
          occupation: occupation,
          favColor: favColor,
          personalS: personalS,
          personalW: personalW
        })
        .then((data) => {
          this.clearForm();
          this.displayAlert('Record added', 'The document ' + name + ' was added to the DB.');
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error) => {
          this.displayAlert('Adding document failed.', error.message);
        });
    }
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  clearForm(): void {
    this.name = '';
    this.birthplace = '';
    this.education = '';
    this.age = ''
  }
}
