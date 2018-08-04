import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { SetpasswordComponent } from '../auth/setpassword/setpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

import { FlexLayoutModule } from '@angular/flex-layout';

import  { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'setpassword', component: SetpasswordComponent }
];


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SetpasswordComponent
  ],
  exports: [RouterModule,FlexLayoutModule],
  providers: [AuthService]
})
export class AuthModule { }
