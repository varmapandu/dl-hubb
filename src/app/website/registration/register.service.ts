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
export class RegisterService extends CommonService {
  private host = Props.API_END_POINT;
  public imageHost = Props.IMAGE_HOST;
  private url: string = '';
  baseUrl: string;
  userDetails: any;
  token: string;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute, private appService: AppService) {
    super();
  }
  
  register(data:any){
    this.url = this.host + "form";
    return this.http.put(this.url,data);
  }
}