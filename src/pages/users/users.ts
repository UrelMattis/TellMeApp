import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  public userList: Array<any>;
  public userArray: Array<any>;
  public userListRef: firebase.database.Reference;

  businessList$: Observable<Account[]>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private business: AuthService,
    public toastCtrl: ToastController) {

    this.userListRef = firebase.database().ref('account/users');
    this.businessList$ = this.business.getBusinessList().snapshotChanges().map(
      changes => {
        return changes.map(list => ({
          key: list.payload.key,
          ...list.payload.val(),
        }));
      });

    this.userListRef.on('value', businessList => {
      let businesses = [];
      businessList.forEach(user => {
        businesses.push(user.val());
        return false;
      });
      this.userList = businesses;
      this.userArray = businesses;
    });
  }
  initializeItems() {
    this.userList = this.userArray;
  }

}
