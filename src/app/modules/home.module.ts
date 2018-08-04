import { NgModule }                  from '@angular/core';
import { Routes, RouterModule }      from '@angular/router';
import { CommonModule }       from '@angular/common';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LandingpageComponent } from './../home/landingpage/landingpage.component';
import { HeaderComponent } from './../home/header/header.component';
import { FooterComponent } from './../home/footer/footer.component';
import { LandingpageBgvideoComponent  } from './../home/landingpage-bgvideo/landingpage-bgvideo.component';




const routes: Routes = [
   { path: '',                                component: LandingpageComponent },
   //{ path: 'homepage',                        component: LandingpageComponent }
   
];

@NgModule({
 imports: [  CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes) ],
 declarations: [LandingpageComponent,LandingpageBgvideoComponent, HeaderComponent, FooterComponent],
 exports : [CommonModule]
})

export class HomeModule { }