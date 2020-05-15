import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "../../home/home.service";
import {School} from "../../models/school";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

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
      studentSize: [0],
      adStreet: [null],
      adSuburb: [null],
      adPostcode: [null],
      adState: [null],
    });
  }

  ngOnInit() {
  }

  /**
   * close the dialog box
   *
   * @author Osanda Wedamulla
   */
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

      this.homeService.saveNewSchool(school)
        .pipe(catchError(this.handleErrorCreatingSchool))
        .subscribe( response => {
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

  /**
   * catch error and add response when creating new school
   *
   * @author Osanda Wedamulla
   * @param error
   */
  private handleErrorCreatingSchool(error: HttpErrorResponse) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;

    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);
  }// handleErrorCreatingSchool()

}// AddSchoolComponent {}
