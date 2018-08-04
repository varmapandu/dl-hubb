import { Component, Directive, OnInit, ViewChild, Renderer,ElementRef, AfterViewInit, AfterViewChecked,Inject } from '@angular/core';
declare var $: any;
import { Contact } from '../../apex/entities/contact.entity';
import { ContactForm } from './courses.form'
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WINDOW } from "../../website/courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { CoursesService } from './courses.service';

// import { setTimeout } from 'timers';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  @ViewChild('nav') nav: ElementRef;
  @ViewChild('footerBotom') footerBottom: ElementRef;
  options = [{ value: 'fullstack', name: "Full Stack" },
  { value: 'devops', name: "DevOps" },
  { value: 'datascience', name: "Data Sciences" },
  { value: 'Pyhton', name: "Python" }];
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  optionSelected: any;
  data: any;
  page: any;
  currentURL = '';
  currentURL_slug : any;
  courseData: any;
  UserDetailsForm: FormGroup;
  meta: any;
  imageHost: any;
  myForm: any = ContactForm.init();
  profile: Contact = new Contact();
  hubspot = 
    {
    name:null,
    email:null,
    phonenumber:null,
    message:null,
    slug:null
  }

// leadSquare=[
//   {
//       Attribute: "FirstName",
//       Value:null
//   },
//   {
//       Attribute: 'EmailAddress',
//       Value:null
//   },
//   {
//       Attribute: 'Phone',
//       Value:null
//   },
//   {
//     Attribute: 'Message',
//     Value:null
// },
//   {Attribute: 'Source Page',
//       Value:null
//   },
// ]
  constructor(private formBuilder: FormBuilder, private coursesService: CoursesService , private renderer: Renderer,@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {
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
    this.courseSearch();

  }
  courseSearch() {
    let searchObj: any = {}
    searchObj.name = "Courses";
    this.coursesService.coursesSearch(searchObj).subscribe((result: any) => {
      this.data = result.data;
      this.courseData = this.data.courses;
      this.imageHost = this.coursesService.imageHost;
      this.coursesService.storageSave(this.data);
    })
  }
  ngAfterViewInit() {
    $(this.nav.nativeElement).affix({
      offset: {
        top: $(this.nav.nativeElement).offset().top,
        bottom: ($('#footer-bottom').outerHeight(true) + 450
        )
      }
    })
  }
  pageNavigate(courseName: any) {
    this.coursesService.navigatePage(courseName);
  }
  onOptionSelected(event) {
    //option value will be sent as event
  }
  Login() {

  }
  onSubmit() {
    this.profile.sourceOfPage = "courses"
    this.coursesService.saveForm(this.profile).subscribe((data:any)=>{
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

      // this.leadSquare[0].Value=this.profile.name;
      // this.leadSquare[1].Value=this.profile.email;
      // this.leadSquare[2].Value=this.profile.mobile;
      // this.leadSquare[3].Value=this.profile.message;
      // this.leadSquare[4].Value=this.currentURL_slug;
      // console.log(this.leadSquare)
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

// navigatePage(pageName:any){
//   this.router.navigate(['/course/'+pageName])
// }
