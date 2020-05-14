import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";
import {School} from "../models/school";

export const SCHOOL_END_POINT = 'schools';
export const SCHOOL_SEARCH_END_POINT = 'search/school';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  /***
   * get all the avilable schools with pagination
   *
   * @author Osanda Wedamulla
   *
   * @param page
   * @param size
   *
   */
  public getAllSchools(page: number, size: number) : Observable<any> {

    let params: HttpParams = new HttpParams();
    params = params.append('sort', 'id,desc');

    if(page)
      params = params.append('page', page.toString());

    if(size)
      params = params.append('size', size.toString());

    return this.http.get<any>(SCHOOL_END_POINT, { params }).pipe(take(1));
  }// getAllSchools()


  /**
   * search school by entered word
   *
   * @author Osanda Wedamulla
   * @param word
   */
  public searchSchoolsByword(word: string) :  Observable<School[]> {

    let params: HttpParams = new HttpParams();
    params = params.append('criteria', word);

    return this.http.get<School[]>(SCHOOL_SEARCH_END_POINT, { params }).pipe(take(1));
  }// searchSchoolsByword()


  /**
   * save new school
   *
   * @author Osanda Wedamulla
   * @param school
   */
  public saveNewSchool(school: School) : Observable<School> {

    return this.http.post<School>(SCHOOL_END_POINT, school).pipe(take(1));
  }// saveNewSchool ()

}// HomeService {}
