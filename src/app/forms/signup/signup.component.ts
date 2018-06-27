import {Component, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialogRef} from '@angular/material';

import {User} from './../../shared/user.model';
import {CallService} from './../../shared/call.service';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.BACKEND_URL;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  title = 'signup';
  successMessage: string;
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    private callservice: CallService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  signupHandler(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';
    const formValue = form.value;
    // console.log('submitted', formValue);
    this.callservice.postData(formValue, BACKEND_URL + '/signup')
    .subscribe((response) => {
        const data = response.json();
        if (data.error) {
          return this.errorMessage = data.error;
        } else if (data.errors) {
        return this.errorMessage = data.errors.map(error => {
          return this.errorMessage = 'Something went wrong: ' + error.msg;
        });
        }  else if (data.message) {
          return this.successMessage = data.message;
        }
      }, (error) => {
        return this.errorMessage = 'Something went wrong ' + error;
      }
    );
  }
}
