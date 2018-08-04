declare var $: any;
import { Component, OnInit,Input,SimpleChange,  ViewChild, ElementRef, AfterViewInit , AfterViewChecked } from '@angular/core';
import { Page } from './../../apex/entities/page.entity';
import { Image } from './../../apex/entities/image.entity';
import { Video } from './../../apex/entities/video.entity';
import { CoursesService } from './../courses/courses.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-bgvideo',
  templateUrl: './bgvideo.component.html',
  styleUrls: ['./bgvideo.component.scss']
})


export class BgvideoComponent implements OnInit {

  @Input() inputData;
  @Input() page;
  @ViewChild('jsVideoIframe') jsVideoIframe:ElementRef;
  @ViewChild('jsVideoWrapper') jsVideoWrapper:ElementRef;
  @ViewChild('jsVideoPoster') jsVideoPoster:ElementRef;
  
  //page: Page = new Page();
  image: Image = new Image();
  video: Video = new Video();
  imageHost : any;
  imageUrl : any;
  url:any;
  constructor(private elRef : ElementRef, private elRef2 : ElementRef, private coursesService : CoursesService, private sanitizer: DomSanitizer) { 
    this.imageHost = this.coursesService.imageHost;
  }

  ngOnInit() {
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if(this.inputData){
      if (changes.hasOwnProperty('inputData')) {
        this.image = JSON.parse(JSON.stringify(this.inputData));
        this.image = this.inputData;
    }
    if(this.page){
      if (changes.hasOwnProperty('page')) {
        this.page = JSON.parse(JSON.stringify(this.page));
        this.video = this.page.video[1];
        // console.log(this.video)
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
      }
    }
  }
}
  ngAfterViewInit() {
    $(document).on('click',`.${this.jsVideoPoster.nativeElement.classList[1]}`,(ev) => {
      ev.preventDefault();
      // var $poster = $(this);
      // console.log(`.${this.jsVideoPoster.nativeElement.classList[1]}`);
      //var $wrapper = $poster.closest(`.${this.jsVideoWrapper.nativeElement.classList[1]}`);
      // videoPlay($wrapper);
      var src = this.jsVideoIframe.nativeElement.dataset.src;
      // hide poster
      this.jsVideoWrapper.nativeElement.classList.add('videoWrapperActive');
      // console.log($wrapper)
      // add iframe src in, starting the video
      this.jsVideoIframe.nativeElement.setAttribute('src',src);
    });
    
    // play the targeted video (and hide the poster frame)
    // function videoPlay($wrapper) {
    //   console.log($wrapper);
    //   var $iframe = $wrapper.find(`.${this.jsVideoIframe.nativeElement.classList[1]}`);
    //   var src = $iframe.data('src');
    //   // hide poster
    //   $wrapper.addClass('videoWrapperActive');
    //   // add iframe src in, starting the video
    //   $iframe.attr('src',src);
    // }

    
    // stop the targeted/all videos (and re-instate the poster frames)
    function videoStop($wrapper) {
      // if we're stopping all videos on page
      if (!$wrapper) {
        var $wrapper = $(this.jsVideoWrapper.nativeElement);
        var $iframe = $(this.jsVideoIframe.nativeElement);
      // if we're stopping a particular video
      } else {
        var $iframe = $wrapper.find(this.jsVideoIframe.nativeElement);
      }
      // reveal poster
      $wrapper.removeClass('videoWrapperActive');
      // remove youtube link, stopping the video from playing in the background
      $iframe.attr('src','');
    }
  }

}
