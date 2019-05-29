import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class QuestionsComponent implements OnInit {


  // obj1;
  obj;
  parentInfo: any;
  parentId: string;
  schoolId: string;
  start: number = 0;
  end: number = 1;
  length: number;
  selectResponse: string;
  obj1: any;
  submissionId: any;
  allQuestionsAnswered: boolean;
  currentCallStatus = {};
  submitBtnDisable: boolean;
  previousResponses: any;
  callstatusLabel: any;
  parentInterviewCompleted: boolean;
  remarksObj = { remarks: "" };
  schoolName: string;
  currentParentType: any;
  // isCompleted: false
  disableNext: boolean = false;
  // isCompleted: any;


  constructor(private config: ConfigService, private route: ActivatedRoute,
    public dialog: MatDialog, private snackBar: MatSnackBar, private location: Location) {

    this.route.params.subscribe(params => {
      this.parentId = params["externalId"];

    });
  }


  getQuestionList(): void {
    this.config.getQuestionList(this.parentId).subscribe(
      resultArray => {
        this.obj = resultArray
        console.log(this.obj, "questions")
        this.obj1 = this.obj.result;

      },

      error => console.log("Error :: " + error)

    )
    console.log(this.obj1, "questionsss")

  }
  ngOnInit() {
    this.getQuestionList();
    console.log(this.obj1, "questionsss")
  }

  nextQuestion(): void {
    // this.checkForCompletionOfQuestion();
    //console.log(this.end + " " + this.generalQuestions[0]['instanceQuestions'].length)
    if (this.end < this.obj1[0]['questions'].length) {
      // this.obj1[0]['questions'][this.start].endTime = Date.now();
      this.start++;
      this.end++;
      // this.obj1[0]['questions'][this.start].startTime = Date.now();
      if (this.obj1[0]['questions'][this.start].visibleIf && !this.checkForDependentVisibility(this.obj1[0]['questions'][this.start])) {
        // //console.log("visibility: " + this.checkForDependentVisibility(this.generalQuestions[0]['instanceQuestions'][this.start]));
        this.obj1[0]['questions'][this.start].validation.required = false;
        this.nextQuestion();
      }
    } else {
      this.checkForCompletionOfInterview();
      if (this.allQuestionsAnswered && !this.parentInterviewCompleted) {
        if (!this.checkForDependentVisibility(this.obj1[0]['questions'][this.start])) {
          this.previousQeustion();
        }
        this.openCompleteModel("completed")
      } else {
        console.log("in")
        // this.previousQeustion();
        if (!this.checkForDependentVisibility(this.obj1[0]['questions'][this.start])) {
          this.previousQeustion();
        }
        this.disableNext = true;
      }
      // if (this.allQuestionsAnswered) {
      //   this.snackBar.open("All questions Answered. Please Change the call status to completed and save.", "Ok", { duration: 10000 })
      // } else {
      //   this.snackBar.open("Please complete all the questions and complete the survey", "Ok", { duration: 2000 })
      // }
    }
  }
  previousQeustion(): void {
    this.disableNext = false;
    // this.checkForCompletionOfQuestion();
    if (this.start) {
      // this.obj1[0]['questions'][this.start].endTime = Date.now()
      this.start--;
      this.end--;
      // this.obj1[0]['questions'][this.start].startTime = Date.now()
      if (this.obj1[0]['questions'][this.start].visibleIf && !this.checkForDependentVisibility(this.obj1[0]['questions'][this.start])) {
        //console.log("visibility: " + this.checkForDependentVisibility(this.generalQuestions[0]['instanceQuestions'][this.start]));
        this.obj1[0]['questions'][this.start].validation.required = false;
        this.previousQeustion();
      }
    } else {
      this.checkForCompletionOfInterview();
    }
  }
  // checkForCompletionOfQuestion() {
  //   const currentQuestionanswer = this.obj1[0]['questions'][this.start].value && this.obj1[0]['questions'][this.start].value.length ? this.obj1[0]['questions'][this.start].value : "";
  //   if (this.obj1[0]['questions'][this.start].validation.required) {
  //     this.obj1[0]['questions'][this.start].isCompleted = currentQuestionanswer ? true : false;
  //     //console.log(this.generalQuestions[0]['instanceQuestions'][this.start].isCompleted)
  //   } else {
  //     this.obj1[0]['questions'][this.start] = true;
  //   }
  // }
  goBack() {
    this.location.back();
  }
  updateValues() {
    //console.log("in update");
    // this.checkForCompletionOfQuestion();
    this.checkForCompletionOfInterview();
  }
  checkForCompletionOfInterview() {
    //console.log(currentQuestionanswer + " " + this.generalQuestions[0]['instanceQuestions'][this.start].isCompleted)
    let completedAllQuestions = true;
    for (const question of this.obj1) {
      if (!question.isCompleted) {
        completedAllQuestions = false;
        // break
      }
    }

    this.obj1 = completedAllQuestions;
    console.log(completedAllQuestions);

    this.submitBtnDisable = this.currentCallStatus['callResponse'] === 'R7' && !this.allQuestionsAnswered ? true : false;

  }

  checkForDependentVisibility(qst): boolean {
    let display = true;
    for (const question of this.obj1) {
      for (const condition of qst.visibleIf) {
        if (condition._id === question._id) {
          if (condition.operator === "||") {
            for (const value of condition.value) {
              if (question.value.includes(value)) {
                return true
              } else {
                display = false;
              }
            }
            return display
            // if (!condition.value.includes(question.value)) {
            //   return false
            // }
          } else {
            // if (question.value.includes(condition.value)) {
            //   return true
            // }
            // console.log(question.value);
            // console.log(question.value + " " + condition.operator + " " + condition.value + question.value.includes(condition.value))
            return question.value.includes(condition.value)
            // for (const value of question.value) {
            //   if ((eval('"' + value + '"' + condition.operator + '"' + condition.value + '"'))) {
            //     return true
            //   } else {
            //     display = false;
            //   }
            // }
            return display
            // if ((!eval('"' + question.value + '"' + condition.operator + '"' + condition.value + '"'))) {
            //   return false
            // }
            // if (question.value.includes(condition.value)) {

            // }
          }
        }

      }
    }
    return display
  }


  openCompleteModel(status) {
    const message = `All questions are completed. Do you want submit the survey?`
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: message, status: "completed", okBtn: "Complete Survey", remarks: true, remarksData: this.remarksObj },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      // //console.log(result)
      if (result.status === 'completed') {
        this.obj[0].remarks = result.remarks;
        this.submitSurvey("completed");
      }
    });
  }
  submitSurvey(status): void {
    let surveyStatus = status;
    if (this.currentCallStatus['callResponse'] === 'R7') {

    }
    const payload = this.constructPayload(surveyStatus);
    console.log(JSON.stringify(payload))
    this.config.submitParentsurvey(this.submissionId, payload).subscribe(response => {
      this.submitCallStatus(status);
    })
  }

  submitCallStatus(status) {
    if (this.currentCallStatus['type'] !== this.obj1[0]['questions'][0].value) {
      this.currentCallStatus['type'] = this.obj1[0]['questions'][0].value;
    }
    if (status === 'completed') {
      this.currentCallStatus['callResponse'] = status === 'completed' ? "R7" : "";
    }
    // this.config.postParentData(this.parentId, this.currentCallStatus).
    //   subscribe(response => {
    //     this.snackBar.open(response.message, "Ok", { duration: 3000 });
    //     this.goBack();
    //   });
  }
  constructPayload(status) {
    const payload = {
      parentId: this.parentId,
      status: status,
      answers: {}
    }
    for (const question of this.obj1) {
      //console.log(question)
      payload.answers[question._id] = {
        "qid": question._id,
        "value": [],
        "remarks": "",
        "fileName": [
        ],
        "payload": {
          "question": question.question,
          "labels": [],
          "responseType": "matrix",
          "isCompleted": question.isCompleted
        },
        "startTime": question.startTime,
        "endTime": question.endTime,
        "countOfInstances": 1,
      };
      for (const key of Object.keys(question.payload)) {
        payload.answers[question._id][key] = question.payload[key]
      }
      for (const question of this.obj1['questions']) {
        const obj = {};
        obj[question._id] = {
          "qid": question._id,
          "value": question.value,
          "remarks": question.remarks,
          "fileName": [
          ],
          "payload": {
            "question": question.question,
            "labels": [],
            "responseType": question.responseType,
            "isCompleted": question.isCompleted

          },
          "startTime": question.startTime,
          "endTime": question.endTime,
          "countOfInstances": 1,
        }
        if (question.inputType === "radio") {
          for (const optn of question.options) {
            if (optn.value === question.value) {
              obj[question._id].payload.labels.push(optn.label)
            }
          }
        } else {
          for (const val of question.value) {
            for (const option of question.options) {
              if (val === option.value) {
                obj[question._id].payload.labels.push(option.label)
              }
            }
            // if(optn.value === instanceQuestion.value){
            //   obj[instanceQuestion._id].payload.labels.push(optn.label)
            // }
          }
        }
        for (const key of Object.keys(question.payload)) {
          obj[question._id][key] = question.payload[key]
        }
        payload.answers[question._id].value.push(obj)
      }
    }
    return payload
  }
  onCancelDialog() {
    const message = "All your unsaved datas will be lost. Do you want to continue ?"
    // const message = status=== 'save' ? `Call status will be updated as " ${this.callstatusLabel}"`  : `All your unsaved datas will be lost. Do you want to continue ? `
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: message, status: 'cancel' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === "save") {
        // this.submitSurvey("started");
        // this.goBack();

      } if (result === "cancel") {
        this.goBack();
      } else {
      }
      //console.log('The dialog was closed' + result);
    });
  }

  openConfirmDialog(status): void {
    const message = "Do you want to save the current changes?"
    // const message = status=== 'save' ? `Call status will be updated as " ${this.callstatusLabel}"`  : `All your unsaved datas will be lost. Do you want to continue ? `
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: message, status: status },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "save") {
        this.submitSurvey("started");
      } if (result === "cancel") {
        this.goBack();
      } else {
      }
      //console.log('The dialog was closed' + result);
    });
  }
}