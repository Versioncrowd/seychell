import { Component, DoCheck } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SignupComponent} from './../forms/signup/signup.component';
import {LoginComponent} from './../forms/login/login.component';
import {AuthService} from './../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements DoCheck {
  title = 'navigation';
  isLoggedIn: boolean;

  constructor(public dialog: MatDialog,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngDoCheck() {
    this.isLoggedIn = this.authservice.isLoggedIn();
  }

  openSignup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'panel';
    dialogConfig.backdropClass = 'bckdrp';

    const dialogRef = this.dialog.open(SignupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
    });
  }

  openLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'panel';
    dialogConfig.backdropClass = 'bckdrp';

    const logRef = this.dialog.open(LoginComponent, dialogConfig);

    logRef.afterClosed().subscribe(data => {
    });
  }

  logout() {
    this.authservice.logout();
  }

  goToWeather() {
    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/weather']);
    } else {
      this.router.navigate(['/timeout']);
    }
  }
}
