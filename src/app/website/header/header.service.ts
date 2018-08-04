import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from '../../service/common.service';
import { Props } from '../../apex/common/props';


import { AppService } from '../../shared/service/app.service';
import { Storage }from '../../shared/utils/storage';
@Injectable()
export class HeaderService extends CommonService {
  private host = Props.API_END_POINT;
  public imageHost = Props.IMAGE_HOST;
  private url: string = '';
  baseUrl: string;
  userDetails: any;
  token: string;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute, private appService: AppService) {
    super();
    // this.coursesSearch().subscribe( data => {
    //   Storage.setSessionItem('courses', data);
    // })
    // this.programsSearch().subscribe( data => {
    //   Storage.setSessionItem('programs', data.data);
    // })
  }
  
  getUserDetails() {
    return this.userDetails;
  }
  getParam(key: string){
    return this.activatedroute.snapshot.queryParams[key];
  }
  coursesSearch(): Observable<any> {
    this.url = this.host + "course/list";
    return this.http.get(this.url)
      
  }
 programsSearch(): Observable<any> {
    this.url = this.host + "programs/list";
    return this.http.get(this.url)
      
  }
  degreesSearch(): Observable<any> {
    this.url = this.host + "programs/futureList";
    return this.http.get(this.url)
      
  }
 navigatePage(pageName:any){
   this.router.navigate(['/course/'+pageName])
 }
 navigateProgramPage(pageName:any){
  this.router.navigate(['/program/'+pageName])
   
 }
 navigateDegreesPage(pageName:any){
  this.router.navigate(['/future/'+pageName])
}
 navigateToThanksPage(){
  this.router.navigate(['thankyou'])
  }
  
  navigateToIndividualProgram(data){
    this.url = this.host + "programs/specific";
    return this.http.post(this.url,data);

  }
}