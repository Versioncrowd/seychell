import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { AboutComponent } from './../forms/about-component/about-component';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})

export class LogoComponent {
  title = 'logo';

  constructor(public dialog: MatDialog) {}

  openInfo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'panel';
    dialogConfig.backdropClass = 'bckdrp';

    let dialogRef = this.dialog.open(AboutComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });
  }
}
