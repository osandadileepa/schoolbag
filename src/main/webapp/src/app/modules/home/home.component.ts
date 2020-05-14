import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddSchoolComponent} from "../dialogs/add-school/add-school.component";
import {FormControl} from "@angular/forms";
import {School} from "../models/school";
import {PageEvent} from "@angular/material/paginator";
import {Page} from "../models/page";
import {HomeService, SCHOOL_END_POINT} from "./home.service";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public page: Page;

  public schoolList: School[] = [];
  public searchList: School[] = [];
  public schoolSearchControl = new FormControl();

  private searchSubscription: Subscription;
  private dialogSubscription: Subscription;

  constructor(private dialog: MatDialog,
              private service: HomeService) { }

  ngOnInit() {
    this.getAllAvailableSchools();
    this.getSchoolsByWord();
  }

  ngOnDestroy(): void {

    if(this.searchSubscription)
      this.searchSubscription.unsubscribe();

    if(this.dialogSubscription)
      this.dialogSubscription.unsubscribe();
  }


  /***
   * open the dialog box to add new school
   *
   * @author Osanda Wedamulla
   *
   */
  public openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = undefined;
    dialogConfig.width = '1000px';

    this.dialogSubscription = this.dialog.open(AddSchoolComponent, dialogConfig).afterClosed().subscribe(value => {
        this.getAllAvailableSchools();
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
    });

  }// getAllAvailableSchools()


  /***
   * search schools by name and address
   *
   * @author Osanda Wedamulla
   *
   */
  public getSchoolsByWord() {
    this.searchSubscription = this.schoolSearchControl.valueChanges.pipe(debounceTime(700)).subscribe( result =>{
      const word: string = result;
      this.service.searchSchoolsByword(word).subscribe((data: School[]) =>{
        this.searchList = data;
      })
    });
  }// getSchoolsByWord()

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
