import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CallService {
  constructor(private http: Http) {}

  postData(data, address) {
    return this.http.post(address, data);
  }
  getData(address) {
    return this.http.get(address);
  }
}

