import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactForm } from '../../website/courses/courses.form'
import { Contact } from '../../apex/entities/contact.entity';
import {CoursesService} from '../courses/courses.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements OnInit {
  UserDetailsForm: FormGroup;
  myForm: any = ContactForm.init();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = "[a-zA-Z ]+$"
  profile: Contact = new Contact();
  @Input() page:any
  fileUrl: any;
  constructor( private formBuilder: FormBuilder,private coursesService:CoursesService) { 
    ContactForm.edit(this.myForm);
    
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.pattern(this.namePattern)]],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern(this.mobilePattern)])]
    });
  }

  ngOnInit() {
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('page')) {
        this.page = JSON.parse(JSON.stringify(this.page));
        // console.log(this.page)
    }
  }
  submit(){
    // let postObj:any = {};
    // postObj.name = this.profile.name;
    // postObj.email = this.profile.email;
    // postObj.mobile = this.profile.mobile;
    this.profile.sourceOfPage = this.page.slug;
    console.log(this.profile)
    this.coursesService.downloadCurriculum(this.profile).subscribe((data:any)=>{
      console.log(data);
      this.fileUrl = data.data.curriculum;
      this.downloadFile(this.fileUrl);
      if(data.status == '1'){
        setTimeout(function () {
    }, 2000);
    this.coursesService.navigateToThanksPage();
      }
    })
  }
  downloadFile(urlToSend) {
    var req = new XMLHttpRequest();
    req.open("GET", urlToSend, true);
    req.responseType = "blob";
    req.onload = function (event) {
        var blob = req.response;
        var fileName = "curriculum" //if you have the fileName header available
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download=fileName;
        link.click();
    };
    req.send();
}
 

}
