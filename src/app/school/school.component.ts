import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  obj;
  obj1
  displayedColumns: string[] = ['name', 'externalId', 'address', 'state', 'country'];
  datasource;
  form: FormGroup;
  constructor(private config: ConfigService, private http: HttpClient, private router: Router) {
    // this.http = httpClient;

  }

  getSchools(): void {

    this.config.getSchools().subscribe(

      resultArray => {
        this.obj = resultArray
        console.log(this.obj, "obj")
        this.obj1 = this.obj.result;
      },
      error => console.log("Error :: " + error),



    )
    // console.log(this.obj, "fghjk");


    // console.log( "getting schools")
  }
  // getParents() {
  //   this.router.navigate(['/parent']);
  // }

  //  test(){
  //    console.log("test1");
  //  }
  //  test2(){
  //    this.test().subscribe();
  //  }



  ngOnInit() {

    this.getSchools();
  }
}
