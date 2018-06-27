import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  title = 'auth';
  url = '';

  ngOnInit() {
    this.getImage();
    console.log(this.url);
  }

  getImage() {
    const num = Math.floor(Math.random() * 10) + 2;
    this.url = 'url("./../../../assets/img/seychelles' + num + '.jpeg")';
    return this.url;
  }


}

