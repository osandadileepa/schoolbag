import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  public schoolFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddSchoolComponent>) { }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }// close()

}
