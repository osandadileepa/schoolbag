import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "../../home/home.service";
import {School} from "../../models/school";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  public schoolFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddSchoolComponent>,
              private homeService: HomeService,
              private snackBar: MatSnackBar) {

    this.schoolFormGroup = this.fb.group({
      name: [null, Validators.required],
      studentSize: [0, Validators.required],
      adStreet: [null, Validators.required],
      adSuburb: [null, Validators.required],
      adPostcode: [null, Validators.required],
      adState: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }// close()


  /***
   * save a mew school with information extracted from fields
   *
   * @author Osanda Wedamulla
   *
   */
  public saveSchool() {

    const school: School = this.schoolFormGroup.value;

    if(school.name) {

      this.homeService.saveNewSchool(school).subscribe( response => {
        console.log('restponse', response);

        if(response) {
          this.close();
          let message = 'New school created : ' +  response.name;

          this.snackBar.open(message,'Close', {
            duration: 2000
          });
        }

      });

    } else {
      this.snackBar.open('New School at least should have a name', 'Close', {
        duration: 2000
      });
    }

  }// saveSchool()

}// AddSchoolComponent {}
