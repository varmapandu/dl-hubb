import { Component,Directive, OnInit , ViewChild, ElementRef, AfterViewInit , AfterViewChecked,Inject} from '@angular/core';
declare var $: any;
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CoursesService} from '../courses/courses.service';
import { Contact } from '../../apex/entities/contact.entity';
import { ContactForm } from '../courses/courses.form';
import { ThankyouService } from './thankyou.service';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { WINDOW } from "../../website/courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';

@Component({
  selector: 'app-thankyoupage',
  templateUrl: './thankyoupage.component.html',
  styleUrls: ['./thankyoupage.component.scss']
})
export class ThankyoupageComponent implements OnInit {
  @ViewChild('nav') nav:ElementRef;
  @ViewChild('footerBotom') footerBottom:ElementRef;
  options = [{value : 'fullstack' , name: "Full Stack"},
  {value : 'devops' , name: "DevOps"},
  {value : 'datascience' , name: "Data Sciences"},
  {value : 'Pyhton' , name: "Python"}];
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  optionSelected: any;
  data:any;
  page :any;
  courseData:any;
  UserDetailsForm: FormGroup;  
  meta : any;
  imageHost:any;
  currentURL = '';
  currentURL_slug : any;
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();
  hubspot = {
    name:null,
    email:null,
    phonenumber:null,
    message:null,
    slug:null
  }
  constructor(private formBuilder: FormBuilder, private coursesService : CoursesService, private thankyouService: ThankyouService,private router: Router,@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { 
    ContactForm.edit(this.myForm);
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.pattern(this.namePattern)]],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern(this.mobilePattern)])]
    });
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
  }
  ngOnInit() {
    this.courseSearch();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  ngAfterViewInit() {
    $(this.nav.nativeElement).affix({ 
      offset: {     
        top: $(this.nav.nativeElement).offset().top,
        bottom: ($('#footer-bottom').outerHeight(true) + 550
        )}
    })
  }
  courseSearch(){
    let searchObj:any = {}
    searchObj.name = "Courses";
    this.coursesService.coursesSearch(searchObj).subscribe((result:any)=>{
      this.data = result.data;
      this.courseData = this.data.courses;
      this.imageHost = this.coursesService.imageHost;
    })
  }


  
  enroll(){
    this.profile.sourceOfPage = "courses"
    this.thankyouService.saveForm(this.profile).subscribe((data:any)=>{
      if(data.status == '1'){
        setTimeout(function () {
    }, 2000);
    this.thankyouService.navigateToThanksPage();
      }
    })
    this.hubspot.name = this.profile.name;
    this.hubspot.email = this.profile.email;
    this.hubspot.phonenumber = this.profile.mobile;
    this.hubspot.message = this.profile.message;
    this.hubspot.slug = this.currentURL_slug;
    console.log(this.hubspot)
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
