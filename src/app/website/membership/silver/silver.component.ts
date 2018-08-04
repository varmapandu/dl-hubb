import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import {FormmodalComponent} from '../../formmodal/formmodal.component';
@Component({
  selector: 'app-silver',
  templateUrl: './silver.component.html',
  styleUrls: ['./silver.component.scss']
})
export class SilverComponent implements OnInit {

  // @Input() page:any;
  // buttonText:any = "SignUp";
  // constructor() { }

  ngOnInit() {
    
  }
  // ngOnChanges(changes: { [key: string]: SimpleChange }) {
  //   if (changes.hasOwnProperty('page')) {
  //       this.page = JSON.parse(JSON.stringify(this.page));
  //       // console.log(this.page);
  //   }
  // }
}
