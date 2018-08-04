import { Component, OnInit,Inject } from '@angular/core';
import {CoursesService} from '../courses/courses.service';
import { ContactForm } from '../../website/courses/courses.form';
import { Contact } from '../../apex/entities/contact.entity';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { WINDOW } from "../../website/courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';

import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApexService } from '../../shared/service/apex.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  namePattern = '[a-zA-Z ]+$';  
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();
  private _pageInfoSubscription: any;
  
  currentURL = null;
  currentURL_slug : any;
  UserDetailsForm: FormGroup;
  hubspot = {
    name:null,
    email:null,
    phone:null,
    message:null,
    slug:null
  }
  constructor(private apexService: ApexService, private router: Router,private coursesService:CoursesService,private formBuilder: FormBuilder,@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { 
    ContactForm.edit(this.myForm);
    if(this.currentURL !== null){
      this.currentURL = window.location.href;
      this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
      console.log(this.currentURL_slug)
    }else{
      this.currentURL_slug = 'landing page'
      console.log(this.currentURL_slug)
      
    }
 
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.pattern(this.namePattern)]],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      // 'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])]
    });
  }

  ngOnInit() {
    this._pageInfoSubscription = this.apexService.sessionPageInfoEvent.subscribe(data => {
     
    
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
     
            window.scrollTo(0, 0)

        });
    });
 
 
  }
    onSubmit(){
      this.profile.sourceOfPage = "home page";
      this.coursesService.saveForm(this.profile).subscribe((data: any) => {
        console.log(data);
        if (data.status == 1) {
          setTimeout(function () {
          }, 2000);
          this.coursesService.navigateToThanksPage();
          this.profile = new Contact();
        }
      })
      this.hubspot.name = this.profile.name;
      this.hubspot.email = this.profile.email;
      this.hubspot.phone = this.profile.mobile;
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
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
        
            return;
        }
        window.scrollTo(0, 0)
    });    
     
    }
    
  

}
