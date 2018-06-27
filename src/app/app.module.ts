import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { ModalComponent } from './modal/modal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { WeatherInfoComponent } from './weatherinfo/weatherinfo.component';
import { AppRoutingModule } from './app-routing.module';
import { UnauthComponent } from './master/unauth/unauth.component';
import { AuthComponent } from './master/auth/auth.component';
import { AboutComponent } from './forms/about-component/about-component';
import {CallService} from './shared/call.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './auth.guard.service';
import { TimeoutComponent } from './timeout/timeout.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavigationComponent,
    ModalComponent,
    WeatherInfoComponent,
    LoginComponent,
    SignupComponent,
    UnauthComponent,
    AuthComponent,
    AboutComponent,
    PageNotFoundComponent,
    TimeoutComponent,
  ],
  entryComponents: [
    SignupComponent,
    NavigationComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    HttpModule
  ],
  providers: [
    CallService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
