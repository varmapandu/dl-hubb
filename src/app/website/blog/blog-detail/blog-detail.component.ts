import { Component, OnInit,ViewChild, Renderer,ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Page } from '../../../apex/entities/page.entity';
import { ContactForm } from '../../courses/courses.form';
import { Contact } from '../../../apex/entities/contact.entity';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, NavigationStart,NavigationEnd } from '@angular/router';
import { BlogService } from './../../blog/blog.service';


declare var $: any;

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  myForm: any = ContactForm.init();
  UserDetailsForm: FormGroup;
  currentURL = '';
  intro:any;
  headName:any;
  blogData:any;
  aboutBlog:any;
  bannerImage:any = {};
  underBannerImage:any = {};
  imageHost:any;
  whyDl:any;
  currentURL_slug : any;
  authorName:any;
  authorDesc:any;
  profile: Contact = new Contact();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  mobilePattern = '^[6-9][0-9]{9}$';
  namePattern = '[a-zA-Z ]+$';
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('footerBotom') footerBottom: ElementRef;
  
  
  constructor(private router: Router, private formBuilder: FormBuilder, private blogService:BlogService) {
    ContactForm.edit(this.myForm);
    this.currentURL = window.location.href;
    this.currentURL_slug = this.currentURL.split('/').pop();
    console.log(this.currentURL_slug);
    this.routerFinder();

    this.UserDetailsForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(this.mobilePattern)])]
    });
   }

  ngOnInit() {
    this.getBlogDetails(this.currentURL_slug);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }
  ngAfterViewInit() {
    $(this.nav.nativeElement).affix({
      offset: {
        top: $(this.nav.nativeElement).offset().top,
        bottom: ($('#footer-bottom').outerHeight(true) + 100
        )
      }
    })
  }
  onSubmit(){
    
  }
  getBlogDetails(slug: any) {
    let searchObj: any = {}
    searchObj.slug = slug;
    this.blogService.getBlogDetails(searchObj, slug).subscribe((data: any) => {
      console.log(data.data)
      this.intro = data.data.blog.intro;
      this.headName=data.data.blog.name;
      this.blogData = data.data.blog.qa;
      this.aboutBlog=data.data.blog.advantage;
      this.whyDl=data.data.blog.whyDL;
      this.bannerImage = data.data.page.image[0];
      this.underBannerImage=data.data.page.image[1];
      this.authorName=data.data.blog.writtenby;
      this.authorDesc=data.data.blog.authordesc;
      console.log(this.bannerImage)
      this.imageHost = this.blogService.imageHost;
      // console.log(this.eventData);
      // this.page = this.eventData.page;
      // this.bannerImage = this.page.image[0];
      // // this.courseName = this.courseData.course.name;
      // this.imageHost = this.eventsService.imageHost;
      // this.eventsService.storageSave(this.eventData);
    })
  }
  updateCount(slug:any){
    let searchObj: any = {}
    searchObj.slug = slug;
    this.blogService.viewCount(searchObj).subscribe((data:any)=>{
      console.log(data);
    });
  }
  routerFinder(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.getBlogDetails(event.url.split('/').pop());
        this.updateCount(event.url.split('/').pop());
      }
    });
  }
}
