import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { CommonService } from '../service/common.service';
import { Storage }from '../shared/utils/storage';
import { AppService } from '../shared/service/app.service';
import { Props } from '../apex/common/props'

@Injectable()
export class AuthService extends CommonService {
  private host = Props.API_END_POINT;
  private url: string = '';
  baseUrl: string;
  userDetails: any;
  token: string;
  constructor(private http: Http, private router: Router, private activatedroute: ActivatedRoute, private appService: AppService) {
    super();

  }
  login(data): Observable<any> {
    this.url = this.host + "login";
    return this.http.post(this.url, data)
      .map(response => {
        let data = response.json();
        console.log(data);
        return response.json()
      })
  }
  getUserDetails() {
    return this.userDetails;
  }
  userLoginEmit() {
    this.appService.sessionClear();
    this.appService.sessionUserEmit(null);
}
  register(data): Observable<any> {
    this.url = this.host + "register";
    return this.http.post(this.url, data )
      .map(response =>{
           response.json();
         return response.json()
      }   
      )    
  }
  setPassword(data): Observable<any> {
    this.url = this.host + "password";
    return this.http.post(this.url, data )
      .map(response =>{
           response.json();
         return response.json()
      }   
      )    
  }
  storageSave(data: any){
    if(data) {
        Storage.setSessionUser(data);
        this.appService.sessionUserEmit(data);
  }
 }

logout(): void {
  this.token = null;
  localStorage.removeItem('currentUser');
}
getParam(key: string){
  return this.activatedroute.snapshot.queryParams[key];
}
getDummyServer():Observable<any>{
  return this.http.get('https://jsonplaceholder.typicode.com/posts',)
  .map(res =>{
    console.log(res);
    res.json();
    return res.json()
  })
}
}