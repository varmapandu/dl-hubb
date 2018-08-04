import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../auth.service';
import { Login } from '../../apex/entities/login.entity';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status:any;
  UserDetailsForm: FormGroup;
  login : Login = new Login;
  isActive: boolean = false;
  showServerError: String;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor( private formBuilder: FormBuilder , private router: Router, private authService: AuthService) { 
    this.UserDetailsForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'password': ['',  Validators.compose([Validators.required, Validators.minLength(5)])]
     });
     this.authService.userLoginEmit();
     this.getDummyList();
  }

  ngOnInit() {
  }
  Login(){
    this.authService.login(this.login)
        .subscribe(
            data => {
              console.log(data)
              this.authService.storageSave(data);
              this.router.navigate(['userslist']);
            },
            error => {
                 console.log(error);
                 this.showServerError="OOPS! Something went wrong please try again"   
            });
}
forgotpswd(){
  this.router.navigate(['setpassword'])
  }
signup(){
  this.router.navigate(['register'])
}
getDummyList(){
  this.authService.getDummyServer().subscribe(result=>{
    console.log(result);
  })
}
}
