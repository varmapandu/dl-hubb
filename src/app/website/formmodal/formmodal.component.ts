import { Component, OnInit, SimpleChange, Input,Inject } from '@angular/core';
import { Contact } from './../../apex/entities/contact.entity';
import { CourseData } from './../../apex/entities/coursedata.entity';
import { ContactForm } from '../../website/courses/courses.form';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { WINDOW } from "../../website/courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { CoursesService } from './../../website/courses/courses.service'
@Component({
  selector: 'app-formmodal',
  templateUrl: './formmodal.component.html',
  styleUrls: ['./formmodal.component.scss']
})
export class FormmodalComponent implements OnInit {
  courseData: CourseData = new CourseData();
  UserDetailsForm: FormGroup;
  courseName: any;
  currentURL = '';
  currentURL_slug : any;
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();
  emailPattern =  '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern =   '[a-zA-Z ]+$';
  @Input() page:any;
  @Input() buttonText:any;
  hubspot = {
    name:null,
    email:null,
    phonenumber:null,
    message:null,
    slug:null
  }
  constructor(private coursesService: CoursesService,private router: Router, private formBuilder: FormBuilder,@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { 
    ContactForm.edit(this.myForm);
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])]
    });
    this.currentURL = window.location.href;
        this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
        console.log(this.currentURL_slug)
  }

  ngOnInit() {
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('page')) {
        this.page = JSON.parse(JSON.stringify(this.page));
    }
  }
  onSubmit() {
    this.profile.sourceOfPage = this.page.name;
    console.log(this.profile)
    this.coursesService.saveForm(this.profile).subscribe((data: any) => {
      console.log(data);
      if (data.status == '1') {
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
