import { Component, OnInit,Input, SimpleChange } from '@angular/core';
import {CoursesService} from './../../courses.service';
import { CourseData } from '../../../../apex/entities/coursedata.entity'
@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {



  branches:any[] = ['Gachibowli','SR Nagar', 'Kukatpally', 'Dilsukhnagar', 'Guntur'];
  @Input() inputData:any;
  @Input() page:any;
  buttonText:any = "Enroll Now"
  defaultBranch: String = 'Gachibowli';
  currentURL = '';
  courseName:any;
  batchDetails : any[] = []
  selectedRow :number;
  courseData:CourseData = new CourseData();
  offlineBatchList: Boolean = true;
  onlineBatchList: Boolean = false;
  constructor(private coursesService :CoursesService) { 
    this.currentURL = window.location.href;
    //this.getCourseDetails(this.currentURL.split('/').pop());
  }

  ngOnInit() {
    
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('page')) {
        this.page = JSON.parse(JSON.stringify(this.page));
        if(this.page){
          this.getBatches('offline',this.defaultBranch,0);
        }
    }
  }
  // getCourseDetails(slug: any) {
  //   let searchObj: any = {}
  //   searchObj.slug = slug;
  //   this.coursesService.getCourseDetails(searchObj, slug).subscribe((data: any) => {
  //     this.courseName = data.data.course.name;
  //     this.getBatches('offline',this.defaultBranch,0);
  //   })
  // }
  getOfflineBatches(mode:any, branch:any, index?:number){
    this.offlineBatchList = true;
    this.onlineBatchList = false;
    this.getBatches(mode,branch,index);
  }
  getOnlineBatches(mode:any,branch:any,index?:number){
    this.offlineBatchList = false;
    this.onlineBatchList = true;
    this.getBatches(mode,branch,index);
  }
  getBatches(mode:any,branch:any,index?:number){
    this.selectedRow = index;
    let searchObj:any = {};
    searchObj.course = this.page.name
    searchObj.branch = branch;
    searchObj.mode = mode;
    this.coursesService.getBatches(searchObj).subscribe((data:any)=>{ 
      this.batchDetails = data.data;
    })
  }
  

}
