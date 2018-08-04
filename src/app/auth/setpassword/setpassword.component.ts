import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../auth.service';
import { SetPassword } from '../../apex/entities/setpassword.entity';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {
  SetPasswordForm: any;
  setpassword: SetPassword;
  setPasswordSuccess :any
  constructor(private formBuilder: FormBuilder , private router: Router, private authService: AuthService) {
    this.setpassword = new SetPassword();
      this.SetPasswordForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmpassword': ['', Validators.required],
     });
     this.setpassword.email = this.authService.getParam('id')
     this.authService.userLoginEmit();
   }

  ngOnInit() {
  }
  setpasswordd(){
    this.authService.setPassword(this.setpassword).subscribe((data)=>{
      console.log(data);
      if (data) {
        this.setPasswordSuccess = data.message;
        setTimeout(() => {   
          this.router.navigate(['signin']);
         }, 2000);    
      }
    })
  }

}
