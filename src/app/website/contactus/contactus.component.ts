import { Component, OnInit,Inject } from '@angular/core';
import { Contact } from '../../apex/entities/contact.entity';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CoursesService} from '../courses/courses.service';
import { WINDOW } from "./../courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  UserDetailsForm: FormGroup;  
  profile: Contact = new Contact();  
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  currentURL = '';
  currentURL_slug : any;
  hubspot = {
    name:null,
    email:null,
    phonenumber:null,
    message:null,
    slug:null
  }
  constructor(private formBuilder: FormBuilder, private coursesService:CoursesService,@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { 
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['',  Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern(this.mobilePattern)])]
    });
  }

  ngOnInit() {
  }
 
  getInTouch(){
    this.profile.sourceOfPage = "connect page"
    console.log(this.profile);
    this.coursesService.saveForm(this.profile).subscribe((data:any)=>{
      console.log(data);
      if(data.status == '1'){
        setTimeout(function () {
    }, 2000);
    this.coursesService.navigateToThanksPage();
      }
    })
    this.hubspot.name = this.profile.name;
    this.hubspot.email = this.profile.email;
    this.hubspot.phonenumber = this.profile.mobile;
    this.hubspot.message = this.profile.message;
    this.hubspot.slug = this.currentURL_slug;
    this.coursesService.saveFormToHubSpot(this.hubspot).subscribe((data:any)=>{
      console.log(data)
      if (data.status == 1) {
        setTimeout(function () {
        }, 2000);
        this.coursesService.navigateToThanksPage();
        this.hubspot = null;
      }
    })

    }

}
