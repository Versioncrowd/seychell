import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  constructor(
    private router: Router) {}

    setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('lastname', authResult.lastname);
        localStorage.setItem('firstname', authResult.firstname);
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
        console.log('you will be logged out in', authResult.expiresIn, 'seconds', this.isLoggedIn(), this.isLoggedOut());
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        console.log('you are logged out!', this.isLoggedIn(), this.isLoggedOut());
        this.router.navigate(['/']);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}


