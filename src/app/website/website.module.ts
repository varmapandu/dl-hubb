import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import{WINDOW_PROVIDERS} from './courses/maincourse/window.service';


import { CarouselComponent } from './carousel/carousel.component';
import { BgvideoComponent } from './bgvideo/bgvideo.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LandingpageBgvideoComponent } from './landingpage-bgvideo/landingpage-bgvideo.component';


import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll/lib/simple-smooth-scroll.module.js';
import { BatchesComponent } from './courses/maincourse/batches/batches.component';


import { CoursesComponent } from './courses/courses.component';
import { SlidingformComponent } from './slidingform/slidingform.component';
import { MaincourseComponent } from './courses/maincourse/maincourse.component';
import { SubcourseComponent } from './courses/subcourse/subcourse.component';
import { ContactusComponent } from './contactus/contactus.component';
//import { ContactcarouselComponent } from './contactcarousel/contactcarousel.component'; 
//import { NgxCarouselModule } from 'ngx-carousel';
import { ProgramsComponent } from './programs/programs.component';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';

import {CoursesService} from '../website/courses/courses.service';
import {ProgramsService} from '../website/programs/programs.service';
import {EventsService} from '../website/events/events.service';
import { ThankyouService} from '../website/thankyoupage/thankyou.service'
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import {BranchAddressComponent} from './branch-address/branch-address.component';
import {DummyComponent } from './dummy/dummy.component'
import { ProgramComponent } from './programs/program/program.component'
import {HeaderService} from './header/header.service';
import { FormmodalComponent } from './formmodal/formmodal.component';
import { DummycarouselComponent } from './dummycarousel/dummycarousel.component';
import { WeTrainComponent } from './programs/program/we-train/we-train.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { AboutEventComponent } from './events/event/about-event/about-event.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { PaymentAvenueComponent } from './landingpage/payment-avenue/payment-avenue.component';
// import { CallusComponent } from './callus/callus.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogService } from './blog/blog.service';
import { HeadertoggleComponent } from './headertoggle/headertoggle.component';
import {AdminloginComponent} from "./adminlogin/adminlogin.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginService} from "../website/adminlogin/login.service";
import {RegisterService} from "../website/registration/register.service";
import {DegreesComponent} from './degrees/degrees.component';
import {DegreeComponent} from './degrees/degree/degree.component';
import {DegreesService} from '../website/degrees/degrees.service';
import { PlacementComponent } from '../website/programs/features/placement/placement.component';
import { AcademicComponent } from '../website/programs/features/academic/academic.component';
import { OnlyatdigitallyncComponent } from '../website/programs/features/onlyatdigitallync/onlyatdigitallync.component';
import { FuturedegreesComponent } from '../website/programs/features/futuredegrees/futuredegrees.component';
import {GoldComponent} from '../website/membership/gold/gold.component';
import {SilverComponent} from '../website/membership/silver/silver.component';

import {PlatinumComponent} from '../website/membership/platinum/platinum.component';


export const routes: Routes = [
  { path: '', component: LandingpageComponent},
  {path:"adminlogin",component:AdminloginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'Placements',component:PlacementComponent},
  {path:'Academic',component:AcademicComponent},
  {path:'other',component:OnlyatdigitallyncComponent},
  {path:'membership/gold',component:GoldComponent},
  {path:'membership/silver',component:SilverComponent},

  {path:'membership/platinum',component:PlatinumComponent},
  

{path:'Future',component:FuturedegreesComponent},
  { path: 'courses', component: CoursesComponent,
  children: [
    { path: "**", component: CoursesComponent},
  ]},
  { path: 'payment', component: PaymentAvenueComponent},
  
  { path: 'course/:id', component: MaincourseComponent},
  //{ path: 'course/:id', component: MaincourseComponent}
  { path: 'connect', component: ContactusComponent,
    children: [
      { path: ':id', component: BranchAddressComponent}
    ]
  },
  { path: 'programs', component: ProgramsComponent},
  { path: 'program/:id', component: ProgramComponent},
  { path: 'future', component: DegreesComponent},
  { path: 'future/:id', component: DegreeComponent},
  { path: 'thankyou', component: ThankyoupageComponent},
  { path: 'events', component: EventsComponent,
  children: [
    { path: "**", component: EventsComponent},
  ]},
  { path: 'event/:id', component: EventComponent},
  { path: 'dummy', component: DummyComponent},
  {path:'blogs',component:BlogComponent},
  {path:'blog/:id', component:BlogDetailComponent},
  {path:'headertoggle', component:HeadertoggleComponent},
  { path: '**', component: LandingpageComponent}
];

@NgModule({
  declarations: [  
    CarouselComponent,
    BgvideoComponent,
    LandingpageComponent,
    LandingpageBgvideoComponent,
    BatchesComponent,
    ContactusComponent,
    CoursesComponent,
    SlidingformComponent,
    MaincourseComponent,
    SubcourseComponent,
    //ContactcarouselComponent,
    ProgramsComponent,
    ModalpopupComponent,
    ThankyoupageComponent,
    BranchAddressComponent,
    ProgramComponent,
    DummyComponent,
    FormmodalComponent,
    DummycarouselComponent,
    WeTrainComponent,
    ReviewsComponent,
    EventsComponent,
    EventComponent,
    AboutEventComponent,
    SitemapComponent,
    PaymentAvenueComponent,
    // CallusComponent,
    BlogComponent,
    BlogDetailComponent,
    HeadertoggleComponent,
    DegreesComponent,
    DegreeComponent,
    PlacementComponent,
    AcademicComponent,
    OnlyatdigitallyncComponent,
    FuturedegreesComponent

  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'digital-lync' }),
    BrowserTransferStateModule,
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    SimpleSmoothScrollModule,
    //NgxCarouselModule
  ],
  
  exports: [RouterModule],
  providers: [CoursesService,ProgramsService,ThankyouService,WINDOW_PROVIDERS,HeaderService, EventsService,BlogService,DegreesService,LoginService,RegisterService]
})
export class WebsiteModule { 

}
