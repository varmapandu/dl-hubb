import {Injectable} from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras} from "@angular/router";
import {ApexService} from "./apex.service";
import {Storage} from "../utils/storage";

//import {DomSanitizer} from '@angular/platform-browser';
@Injectable()
export class AppService {
    constructor(private router: Router, private route: ActivatedRoute,  private apexService: ApexService){
       
    }
    getSessionItem(key: string){
        return Storage.getSessionItem(key);
    }
    setSessionItem(key: string, value: any){
        return Storage.setSessionItem(key, value);
    }
    sessionUserEmit(data: any){
        this.apexService.sessionUserEmit(data);
    }
    getSessionUser() {
        return Storage.getSessionUser();
    }
    sessionPageInfoEmit(data: any){
        this.apexService.sessionPageInfoEmit(data);
    }
    metaDataEmit(data: any){
        this.apexService.metaDataEmit(data);
    }
    sessionClear() {
        Storage.clearSession();
    }

}