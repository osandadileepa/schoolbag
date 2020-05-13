import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddSchoolComponent} from "../dialogs/add-school/add-school.component";
import {FormControl} from "@angular/forms";
import {School} from "../models/school";
import {PageEvent} from "@angular/material/paginator";
import {Page} from "../models/page";
import {HomeService, SCHOOL_END_POINT} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public page: Page;

  public schoolList: School[] = [];
  public searchList: School[] = [];
  public schoolSearchControl = new FormControl();

  constructor(private dialog: MatDialog,
              private service: HomeService) { }

  ngOnInit() {

    this.getAllAvailableSchools();
  }


  public openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = undefined;
    dialogConfig.width = '1200px';

    this.dialog.open(AddSchoolComponent, dialogConfig).afterClosed().subscribe(value => {
      if(value) {
        console.log('On School add close');
      }
    });

  }// openDialog()

  /***
   * get all the available schools form the database to disply
   *
   * @author Osanda Wedamulla
   *
   * @param page
   * @param size
   */
  public getAllAvailableSchools(page?: number, size?: number) {

    this.service.getAllSchools(page, size).subscribe( (response: any) =>{



      this.schoolList = <School[]>response._embedded[SCHOOL_END_POINT];
      this.page = response.page;

      console.log('DATA', response._embedded);

    });

  }// getAllAvailableSchools()

  /***
   * get school list based on the page selection
   *
   * @author Osanda Wedamulla
   * @param event
   */
  public onPageClick(event:PageEvent) {
    this.getAllAvailableSchools(event.pageIndex, event.pageSize)
  }// onPageClick()

}// HomeComponent {}
