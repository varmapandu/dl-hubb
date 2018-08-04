import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { WINDOW } from "./../../courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
declare var $: any;
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { ProgramsService } from './../programs.service';
import { Contact } from '../../../apex/entities/contact.entity';
import { ContactForm } from './../../courses/courses.form';
import { ProgramsData } from '../../../apex/entities/programdata.entity';
import { Page } from '../../../apex/entities/page.entity';
import {CoursesService} from '../../courses/courses.service';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  currentURL = '';
  programName: String;
  programData: ProgramsData = new ProgramsData();
  imageHost: any;
  page: any = {};
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();

  UserDetailsForm: FormGroup;
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  // emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
  emailPattern = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  bannerImage: any = {};
  biggestPro:any = [];
  videoPosterImage:any;

  currentURL_slug : any;
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('gotoBtn') gotoBtn: ElementRef;
  hubspot = {
    name:null,
    email:null,
    phone:null,
    message:null,
    slug:null
  }
  constructor(private coursesService:CoursesService,private programsService: ProgramsService, private router:Router, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {
    this.currentURL = window.location.href;
    ContactForm.edit(this.myForm);
    this.routerFinder();
    this.UserDetailsForm = this.formBuilder.group({
      // 'name': ['', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      // 'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])]
    });
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
    console.log(this.currentURL_slug)
  }

  ngOnInit() {
    this.getProgramsDetails(this.currentURL.split('/').pop().split('?')[0]);
  }
  // ngAfterViewInit() {
  //   $(this.nav.nativeElement).affix({
  //     offset: {
  //       top: $(this.nav.nativeElement).offset().top,
  //       bottom: ($('#footer-bottom').outerHeight(true) + 200
  //       )
  //     }
  //   })
  // }
  getProgramsDetails(slug: any) {
    let searchObj: any = {}
    searchObj.slug = slug;
    this.programsService.getProgramDetails(searchObj).subscribe((data: any) => {
      this.programData = data.data;
      // this.biggestPro = this.programData.program.biggest;
      // console.log(this.programData)
      this.programName = this.programData.program.name;
      this.imageHost = this.programsService.imageHost;
      this.page = this.programData.page;
      this.bannerImage = this.page.image[0];
      this.videoPosterImage = this.page.image[1];
      this.programsService.storageSave(this.programData);
    })
  }
  onSubmit() {
    this.profile.sourceOfPage = this.programName;
    console.log(this.profile)    
    this.programsService.saveForm(this.profile).subscribe((data:any)=>{
      console.log(data);
      if(data.status == '1'){
        setTimeout(function () {
    }, 2000);
    this.programsService.navigateToThanksPage();

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
  }
  routerFinder(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.getProgramsDetails(event.url.split('/').pop());
      }
    });
  }

}
