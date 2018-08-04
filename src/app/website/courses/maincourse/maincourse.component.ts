import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { WINDOW } from "./window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { Contact } from '../../../apex/entities/contact.entity';
import { CourseData } from '../../../apex/entities/coursedata.entity';
import { Page } from '../../../apex/entities/page.entity';
import { ContactForm } from '../courses.form'
//declare var $: any;
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from './../courses.service'
@Component({
  selector: 'app-maincourse',
  templateUrl: './maincourse.component.html',
  styleUrls: ['./maincourse.component.scss']
})

export class MaincourseComponent implements OnInit {
  
  selectedItem: any;
  states: any = {};
  isScrolled: any;
  currentURL = '';
  currentURL_slug : any;
  isShowModal:boolean = true;
  showForm:boolean = false;
  UserDetailsForm: FormGroup;
  courseName: any;
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  page: Page = new Page();
  courseData: CourseData = new CourseData();
  btns: any;
  imageHost: any;
  bannerImage:any;
  stickyFooter: any;
  enrollBtn: Boolean;
  buttonText:any="Enroll Now";
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('gotoBtn') gotoBtn: ElementRef;
  @ViewChild('footerBotom') footerBottom: ElementRef;
  
  constructor(private coursesService: CoursesService,private router: Router, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {
    this.states.activeItem = '1';
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
    this.routerFinder();
    this.isShowModal = true;
    ContactForm.edit(this.myForm);
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])]
    });
  }

  ngOnInit() {
    console.log(this.currentURL_slug)
    this.getCourseDetails(this.currentURL_slug);
  }
  // ngAfterViewInit() {
  //   // $(this.nav.nativeElement).affix({
  //   //   offset: {
  //   //     top: $(this.nav.nativeElement).offset().top,
  //   //     bottom: ($('#footer-bottom').outerHeight(true) + 650
  //   //     )
  //   //   }
  //   // })
  // }
  getCourseDetails(slug: any) {
    let searchObj: any = {}
    searchObj.slug = slug;
    this.coursesService.getCourseDetails(searchObj, slug).subscribe((data: any) => {
      this.courseData = data.data;
      console.log(this.courseData);
      this.page = this.courseData.page;
      this.bannerImage = this.courseData.page.image[0];
      this.courseName = this.courseData.course.name;
      this.imageHost = this.coursesService.imageHost;
      this.coursesService.storageSave(this.courseData);
    })
  }
  updateCount(slug:any){
    let searchObj: any = {}
    searchObj.slug = slug;
    this.coursesService.viewCount(searchObj).subscribe((data:any)=>{
      // console.log(data);
    });
  }
  menu = [
    {
      id: '1',
      name: 'Upcoming Batches',
      class: 'batches'
    }, {
      id: '2',
      name: 'Course Curriculum',
      class: 'course'
    }, {
      id: '3',
      name: 'Projects',
      class: 'projects'
    }, {
      id: '4',
      name: 'Career',
      class: 'career'
    }, {
      id: '5',
      name: 'Why Digital Lync'
    }, {
      id: '6',
      name: 'Our Reviews'
    }
  ]

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number > 912) {
      this.isScrolled = true;  
    } 
    else {
      this.isScrolled = false;
    }
    if (number > 1168 && number < 4900) {
      this.stickyFooter = true
    } else {
      this.stickyFooter = false
    }
    if(number > 1036){
      this.enrollBtn = true;
    }else{
      this.enrollBtn = false;
    }
  }
  
  Login() {
  }
  
  onSubmit() {
    this.coursesService.saveForm(this.profile).subscribe((data: any) => {
      console.log(data);
      if (data.status == '1') {
        setTimeout(function () {
        }, 2000);
        this.coursesService.navigateToThanksPage();
      }
    })
  }
  routerFinder(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
          this.getCourseDetails(event.url.split('/').pop());
          this.updateCount(event.url.split('/').pop());
      }
    });
  }
}
