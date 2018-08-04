import { Component, ViewChild, OnInit, HostListener, Inject } from '@angular/core';
import { ApexService } from './shared/service/apex.service';
import { Util } from './shared/utils/util';
import { AppService } from './shared/service/app.service';
import { Storage } from './shared/utils/storage';
import { Title } from '@angular/platform-browser';
import { Meta, TransferState } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { WINDOW } from "./website/courses/maincourse/window.service";
import { Location } from '@angular/common';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentURL = '';
  currentURL_slug : any;
  showLoader: boolean = false;
  private _userSubscription: any;
  private _loaderSubscription: any;
  private _pageInfoSubscription: any;
  private _metaSubscription: any;
  pageInfo: any;
  metaData:any
  routeName:any;
  isBookAppointment:boolean = false;
  constructor(private apexService: ApexService, private router: Router,
     private titleService: Title,private meta: Meta, private appService:AppService,
     @Inject(DOCUMENT) private document: Document,
     @Inject(WINDOW) private window: Window,
      private _location: Location, private _domSanitizer: DomSanitizer) {
      this.routerFinder();
   }
  ngOnInit() {
    this._pageInfoSubscription = this.apexService.sessionPageInfoEvent.subscribe(data => {
      if(data) {
        this.pageInfo = Storage.getSessioPageInfo();
        this.setTitle(this.pageInfo.title)
        this.apexService.metaDataEmit(Storage.getMetaData());
      }
    
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
            
                return;
            }
            window.scrollTo(0, 0)
        });
     
    });
    
    this._metaSubscription = this.apexService.metaDataEvent.subscribe(data => {
      if(data) {
        data.forEach(element => {
          if(element._id){
            delete element._id;
          }
        });
        this.metaData = Object.assign([], data);
        this.meta.addTags(this.metaData);
      }
    });
  }  
  public setTitle( newTitle) {
    this.titleService.setTitle( newTitle );
  }
  routerFinder(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        // if(event.url == "/" || event.url == "/connect"){
        if(event.url == "/thankyou"){
          //this.isBookAppointment = true;
          this.setTitle('Thank you');
          this.meta.addTags([{content: "Thank you", name: "title"}, {content: "Thank you for enrolling to digital lync", name: "description"}, {content: "Full stack, Devops,Machine learning, pythons, courses", name: "keywords"}])
        }if(event.url == "/connect"){
          this.setTitle('Connect us | Best Software training academy');
        }if(event.url == "/"){
          this.setTitle('Fastest Growing Hub for Technologies in Hyderabad | Digital Lync');
          this.meta.addTags([{name : "Digital lync", content:"Technology hub"}])
        }
        else{
          //this.isBookAppointment = false;
        }
      }
    });
  }

}
