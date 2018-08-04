import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { EventsService} from './../events.service';

import { EventsData } from '../../../apex/entities/eventsData.entity';
import { Page } from '../../../apex/entities/page.entity';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  recommendationEnable = "0";
  _paq=[];
  eventData:EventsData = new EventsData();
  page: Page = new Page();
  imageHost:any;
  currentURL:any;
  currentURL_slug:any;
  buttonText:any = "Pay@Event";
  bannerImage:any = {};
  constructor(private eventsService: EventsService,private router: Router,) { 

    this.routerFinder();
  }

  ngOnInit() {
    console.log(this.currentURL_slug)
    this.getEventDetails(this.currentURL_slug);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
  }
  getEventDetails(slug: any) {
    let searchObj: any = {}
    searchObj.slug = slug;
    this.eventsService.getEventsDetails(searchObj, slug).subscribe((data: any) => {
      console.log(data.data)
      this.eventData = data.data;
      console.log(this.eventData);
      this.page = this.eventData.page;
      this.bannerImage = this.page.image[0];
      // this.courseName = this.courseData.course.name;
      this.imageHost = this.eventsService.imageHost;
      this.eventsService.storageSave(this.eventData);
    })
  }
  getDirections(){
    
    if(this.recommendationEnable){
      this._paq.push([TrackEvent,'Event Page','Get Directions'])
    }
    console.log(this.eventData.event.address)
    window.open('https://maps.google.com/maps?saddr=&daddr='+this.eventData.event.address);
  }
  routerFinder(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
          this.getEventDetails(event.url.split('/').pop());
      }
    });
  }
  
}
