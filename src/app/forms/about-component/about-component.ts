import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.html',
  styleUrls: ['./about-component.css']
})

export class AboutComponent {

    constructor(
      public dialogRef: MatDialogRef<AboutComponent>) { }

      onNoClick(): void {
        this.dialogRef.close();
      }

  }

