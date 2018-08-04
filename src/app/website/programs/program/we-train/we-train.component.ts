import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-we-train',
  templateUrl: './we-train.component.html',
  styleUrls: ['./we-train.component.scss']
})
export class WeTrainComponent implements OnInit {

  @Input() page:any;
  buttonText:any = "SignUp";
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('page')) {
        this.page = JSON.parse(JSON.stringify(this.page));
        // console.log(this.page);
    }
  }
}
