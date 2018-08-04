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
export class BlogService extends CommonService {
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

 blogsSearch(data:any){
    this.url = this.host + "page/blogs";
    return this.http.post(this.url, data)
  }
  getBlogDetails(data:any, courseName){
    this.url = this.host + "page/blog";
    return this.http.post(this.url, data)
  }
  viewCount(data:any){
    this.url = this.host + "blog/count/";
      return this.http.post(this.url, data)
  }
  saveForm(data: any) {
    //this.appService.showLoader(true);
    this.url = this.host+"enroll";
    return this.http.put(this.url, {data: data});
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
   this.router.navigate(['/skywave-kingKong/'+pageName])
 }

 navigateToThanksPage(){
  this.router.navigate(['thankyou'])
}

}