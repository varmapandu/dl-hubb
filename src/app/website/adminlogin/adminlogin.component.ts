import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Login} from '../../apex/entities/login.entity';
import {LoginService} from  './login.service';
import {routes} from "../../website/website.module";
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  UserDetailsForm: FormGroup;  
  namePattern = '[a-zA-Z ]+$';
  profile: Login = new Login(); 
  result:any;
  status:any;
  constructor(private formBuilder: FormBuilder,private loginservice: LoginService,private router:Router) {
    this.UserDetailsForm = this.formBuilder.group({
      'name': ['',  Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'password': ['', [Validators.required]],
    });
   }
Login(){
console.log(this.profile);
let data={
  data:{
  "username":this.profile.userName,
  "password":this.profile.password
  }
}
console.log(data);
this.loginservice.Login(data).subscribe((data:any)=>{
  this.result=data;
  console.log(this.result);

  if(this.result.status==1){
    this.router.navigate(['/registration']);
  }
});
}
  ngOnInit() {
  }

}
