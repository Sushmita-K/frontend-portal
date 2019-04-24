import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  token: any;
  constructor(private http: HttpClient) {

  }

  configUrl = 'http://localhost:4201/schools';
  parentUrl = 'http://localhost:4201/parents/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })

  }

  getSchools() {
    this.getToken();
    return this.http.get(this.configUrl);
  };


  getParentsList(schoolId) {
    this.getToken();
    return this.http.get(this.parentUrl + schoolId);
  }

  getToken() {
    this.token = localStorage.getItem('authToken')
  }
}
