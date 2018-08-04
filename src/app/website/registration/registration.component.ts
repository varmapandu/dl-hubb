
import { Component, OnInit,Inject } from '@angular/core';
import { Register } from '../../apex/entities/register.entity';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RegisterService} from  './register.service';
import { WINDOW } from "./../courses/maincourse/window.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import {routes} from "../../website/website.module";
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  UserDetailsForm: FormGroup;  
  profile: Register = new Register();  
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  result:any;
  message:any;

  constructor(private formBuilder: FormBuilder,private registerservice: RegisterService,private router:Router) { 
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['',  Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'college': ['', [Validators.required]],
      'specialization': ['', [Validators.required]],
      'qualification': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'courseInterested': ['', [Validators.required]],
      'dob':['',[Validators.required]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern(this.mobilePattern)])]
    });
  }
register(){
  console.log(this.profile);
  let data={
    data:{
    "name":this.profile.name,
    "email":this.profile.email,
    "mobile":this.profile.mobile,
    "college":this.profile.college,
    "qualification":this.profile.qualification,
    "specialization":this.profile.specialization,
    "address":this.profile.address,
    "courseInterested":this.profile.courseInterested,
    "dob":this.profile.dob

    }
  }
  this.registerservice.register(data).subscribe((data:any)=>{
    this.result=data;
    if(this.result.status==1){
      this.message=data.data.message;
      setTimeout(() => {
        this.message = null;
      }, 2000);
      
    }
  });
  this.UserDetailsForm.reset()
}
  ngOnInit() {
  }

}
