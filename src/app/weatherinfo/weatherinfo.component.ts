import { Component, OnInit, DoCheck } from '@angular/core';
import { CallService } from './../shared/call.service';
import * as moment from 'moment';

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Victoria,sc&units=metric&APPID=ab0bdcd7264beb18da30b8ccccf744a0';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weatherinfo.component.html',
  styleUrls: ['./weatherinfo.component.css']
})

export class WeatherInfoComponent implements OnInit {
  title = 'weatherinfo';
  firstname: string;
  lastname: string;
  weatherData: object;
  errorMessage: string;
  time: any;
  isLoggedIn: boolean;

  constructor(private callservice: CallService) {}

  getTime() {
    setInterval(() => {
      this.time = moment.utc().utcOffset(+'240').format('DD MMMM YYYY HH:mm:ss');
    }, 1000);
  }

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    const url = API_URL;

    this.callservice.getData(url)
    .subscribe((response) => {
      const data = response.json();
      this.weatherData = {
        weather: data.weather[0].main,
        detailed: data.weather[0].description,
        temperature: data.main.temp,
        windspeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure
      };
    }, (error) => {
      this.errorMessage = 'Could not contact the Api: ' + error;
    });

    this.getTime();
  }
}


