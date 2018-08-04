import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit , AfterViewChecked} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
import { WINDOW } from "./../../../courses/maincourse/window.service";
import { Contact } from '../../../../apex/entities/contact.entity';
import { ContactForm } from './../../../courses/courses.form';
import { ProgramsService } from './../../programs.service';
import {CoursesService} from './../../../courses/courses.service';
import {HeaderService} from './../../../header/header.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {
  courseName:any;
  currentURL = '';
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();  
  UserDetailsForm: FormGroup;  
  data: any;  
  currentURL_slug : any;
  courseData: any;
  programData: any;  
  imageHost: any;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  hubspot = {
    name:null,
    email:null,
    phonenumber:null,
    message:null,
    slug:null
  }
  @ViewChild('nav') nav:ElementRef;
  @ViewChild('footerBotom') footerBottom:ElementRef;
  constructor(private coursesService: CoursesService ,private headerService:HeaderService,@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window,private formBuilder: FormBuilder, private programsService:ProgramsService) { 
  
    ContactForm.edit(this.myForm);
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['',  Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern(this.mobilePattern)])]
    });
    this.programSearch();  
 
  }

  ngOnInit() {
    this.programSearch();    
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop().split('?')[0];
    console.log(this.currentURL_slug)
  }
  ngAfterViewInit() {
    $(this.nav.nativeElement).affix({ 
      offset: {     
        top: $(this.nav.nativeElement).offset().top,
        bottom: ($('#footer-bottom').outerHeight(true) + 550
        )}
    })
  }
  programSearch(){
    // let searchObj:any = {}
    // searchObj.name = "Placement";
    let name="Placement";
    let data={
      type:name
    }
    this.headerService.navigateToIndividualProgram(data).subscribe((result:any)=>{
      this.data = result.data;
      console.log(this.data);
      this.programData = this.data.list;
      this.imageHost = this.programsService.imageHost;
      // this.programsService.storageSave(this.data);
    })
  }
  pageNavigate(courseName:any){
      this.programsService.navigatePage(courseName);
  }
onOptionSelected(event){
   
}

onsubmit(){
  this.profile.sourceOfPage = "Placement Programs";
  this.programsService.saveForm(this.profile).subscribe((data:any)=>{
    if(data.status == '1'){
      setTimeout(function () {
  }, 2000);
  this.programsService.navigateToThanksPage();
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
  
}


}
