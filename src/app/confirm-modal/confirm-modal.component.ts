import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  remarksObj = { remarks: "" };

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
  }

  confirm() {
    if (this.data.status === 'completed') {
      this.dialogRef.close({ status: this.data.status, remarks: this.remarksObj.remarks });
    } else {
      this.dialogRef.close(this.data.status);
    }
  }

}
