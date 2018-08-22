import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { ManagePage } from '../pages/manage/manage';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../config/credentials';
import { SettingsPage } from '../pages/settings/settings';
import { AuthService } from '../services/auth.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FbService } from '../services/firebase.service';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManagePage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ForgotPasswordPage,
    SettingsPage,
    EditProfilePage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ManagePage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ForgotPasswordPage,
    SettingsPage,
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireDatabase,
    AuthService,
    ImagePicker,
    Crop,
    FbService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
