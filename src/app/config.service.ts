import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';


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
  questionUrl = 'http://localhost:4201/questions/';
  submitUrl = 'http://localhost:4201/submission/';

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

  getQuestionList(parentId) {
    this.getToken();
    return this.http.get(this.questionUrl + parentId);
  }
  getToken() {
    this.token = localStorage.getItem('authToken')
  }
  submitParentsurvey(parentId, payload) {
    return this.http.post(this.submitUrl + parentId, payload)
  }

}

