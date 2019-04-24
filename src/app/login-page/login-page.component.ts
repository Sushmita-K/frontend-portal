import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  messages;
  status;
  token;
  form: FormGroup;
  constructor(private router: Router, private http: HttpClient, private config: ConfigService) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('')])
    });
    console.log(this.form);
    config.token = this.token;
    console.log(config.token, "hey this is token")


  }




  onSubmit() {
    console.log(this.form.value);
    let obj = this.http.post('http://localhost:4201/auth', {

      email: this.form.value.email,
      password: this.form.value.password
    });
    obj.subscribe((data) => {
      this.messages = data['message'];
      this.status = data['status'];
      this.token = data['token'];
      if (this.status == 200) {
        this.router.navigate(['/school']);

      }

      console.log(this.token, "token");
      localStorage.setItem('authToken', this.token);
      this.token = this.config.token;
    });
  }

  ngOnInit() {

  }

}


