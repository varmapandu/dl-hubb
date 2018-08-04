import { Component, OnInit, Input , SimpleChange} from '@angular/core';

@Component({
  selector: 'app-about-event',
  templateUrl: './about-event.component.html',
  styleUrls: ['./about-event.component.scss']
})
export class AboutEventComponent implements OnInit {

  @Input() eventData:any;
  buttonText:any = "Enroll";
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('eventData')) {
        this.eventData = JSON.parse(JSON.stringify(this.eventData));
        console.log(this.eventData);
    }
  }

}
