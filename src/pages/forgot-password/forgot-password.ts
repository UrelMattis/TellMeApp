import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public resetPassForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.resetPassForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
    });
  }

  resetPassword() {
    if (!this.resetPassForm.valid) {
      console.log(this.resetPassForm.value);
    } else {
      this.authProvider.resetPassword(this.resetPassForm.value.email)
        .then((user) => {
          let alert = this.alertCtrl.create({
            message: "A reset link has been sent to your email",
            buttons: [
              {
                text: "Ok",
                role: 'cancel',
                handler: () => { this.navCtrl.pop(); }
              }
            ]
          });
          alert.present();
        }, (error) => {
          var popUpMessage: string = error.message;
          let popUpAlert = this.alertCtrl.create({
            message: popUpMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          popUpAlert.present();
        });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}
