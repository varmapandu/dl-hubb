import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { CommonService } from '../../service/common.service';
import { Props } from '../../apex/common/props';


import { AppService } from '../../shared/service/app.service';
import { Storage }from '../../shared/utils/storage';
@Injectable()
export class CoursesService extends CommonService {
  private host = Props.API_END_POINT;
  public imageHost = Props.IMAGE_HOST;
  private url: string = '';
  baseUrl: string;
  userDetails: any;
  token: string;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute, private appService: AppService) {
    super();
  }
  
  getUserDetails() {
    return this.userDetails;
  }
  getParam(key: string){
    return this.activatedroute.snapshot.queryParams[key];
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
 searchById(id:any): Observable<any> {
    this.url = this.host + "details?id=" + id;
    return this.http.get(this.url)
      
  }

  coursesSearch(data:any){
    this.url = this.host + "page";
    return this.http.post(this.url, data)
  }
  getCourseDetails(data:any, courseName){
    this.url = this.host + "page/course/";
    return this.http.post(this.url, data)
  }
  viewCount(data:any){
    this.url = this.host + "course/count/";
      return this.http.post(this.url, data)
  }
  saveForm(data: any) {
    //this.appService.showLoader(true);
    this.url = this.host+"enroll";
    return this.http.put(this.url, {data: data});
  }
  saveFormToHubSpot(data: any) {
    //this.appService.showLoader(true);
    this.url = this.host+"enroll/hubspot";
    // this.url='https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$rf99f520720223acab7229b415787ae6a&secretKey=f504b70e8c4dcba8e28d1d64eb271d311d02baf0';
    console.log(data);
    return this.http.post(this.url,{data: data});
  }
  downloadCurriculum(data: any) {
    //this.appService.showLoader(true);
    this.url = this.host+"enroll/curriculum";
    return this.http.put(this.url, {data: data});
  }
  getBatches(data:any){
    this.url = this.host + "batch";
    return this.http.post(this.url, data)
  }
  storageSave(data: any){
    if(data.page) {
        Storage.setSessionPageInfo(data.page);
        this.appService.sessionPageInfoEmit(data.page);
    }
    if(data.page.meta) {
        Storage.setMenuList(data.page.meta);
        this.appService.metaDataEmit(data.page.meta);
    }
 }
 navigatePage(pageName:any){
   this.router.navigate(['/course/'+pageName])
 }

 navigateToThanksPage(){
  this.router.navigate(['thankyou'])
}

}