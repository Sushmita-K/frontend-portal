import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  obj;
  obj1;
  schoolId;
  displayedColumns: string[] = ['name', 'phoneNumber', 'student', 'address', 'button'];

  constructor(private config: ConfigService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.schoolId = params["externalId"];

    });
  }

  getParentsList(): void {
    this.config.getParentsList(this.schoolId).subscribe(
      resultArray => {
        this.obj = resultArray
        this.obj1 = this.obj.result;

      },

      error => console.log("Error :: " + error)

    )


  }

  ngOnInit() {
    this.getParentsList();
    console.log(this.schoolId, "schoolId")
  }

}
