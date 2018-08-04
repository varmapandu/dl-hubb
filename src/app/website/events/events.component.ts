import { Component, OnInit } from '@angular/core';
import { EventsService} from './events.service';
import {EventsData} from './../../apex/entities/eventsData.entity';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {


  data:any;
  eventsData:any = new EventsData();
  imageHost:any;
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsSearch();
  }
  
  eventsSearch(){
    let searchObj: any = {}
    searchObj.name = "Events";
    this.eventsService.eventsSearch(searchObj).subscribe((result: any) => {
      this.data = result.data;
      console.log(this.data);
      this.eventsData = this.data.events;
      this.imageHost = this.eventsService.imageHost;
      this.eventsService.storageSave(this.data);
    })
  }
  pageNavigate(eventName: any) {
    this.eventsService.navigatePage(eventName);
  }
}
