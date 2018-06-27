import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialogRef, MatError} from '@angular/material';
import {Router} from '@angular/router';

import {CallService} from './../../shared/call.service';
import {AuthService} from './../../shared/auth.service';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.BACKEND_URL;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = 'login';
  errorMessage: string;
  successMessage: string;
  expiresIn: number;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private callservice: CallService,
    private authservice: AuthService,
    private router: Router) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    loginHandler(form: NgForm) {
      const formValue = form.value;
      this.callservice.postData(formValue, BACKEND_URL + '/login')
      .subscribe(
        (response) => {
          const data = response.json();
          if (data.error) {
              return this.errorMessage = data.error;
            } else {
              if (data.token) {
                this.authservice.setSession(data);
                this.dialogRef.close();
                this.router.navigate(['weather']);
              }
            }
        },
        (error) => {
          return this.errorMessage = 'Something went wrong ' + error;
        }
      ); // end Subscribe
    }
}
