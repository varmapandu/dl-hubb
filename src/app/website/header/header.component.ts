import { Component, OnInit, Inject, Input, HostListener } from '@angular/core';
import { HeaderService } from './header.service';
import { ProgramList } from './../../apex/entities/programList.entity';
import { Storage } from './../../shared/utils/storage';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  courseList: any;
  fixed: boolean;
  hoverEffect: boolean = false;
  @Input() bookAppointment: Boolean;
  programList: ProgramList;
  degreesList: any;
  constructor(private headerservice: HeaderService) {
    this.courseList = this.courseDataLoader();
    this.programList = this.programDataLoader();
    this.degreesList = this.degreeDataLoader();
    // console.log(this.degreesList);
    // console.log(this.programList);
    // this.degreesList=this.degreeDataLoader();
    //console.log(this.currentURL.split('/').pop());    
  }

  ngOnInit() {
    this.getCourses();
    this.getPrograms();
    this.getDegrees();
    $(document).ready(function () {
      $("nav").find("li").on("click", "a", function () {
          $('.navbar-collapse.in').collapse('hide');
      });
  });
  }
  
  getCourses()  {
    this.headerservice.coursesSearch().subscribe((data: any) => {
      this.courseList = data.data;
    })
  }
  navigateToCourse(pageName: string) {
    this.headerservice.navigatePage(pageName)
  }
  navigateToProgram(pageName: string) {
    this.headerservice.navigateProgramPage(pageName)
  }
  navigateToDegreesProgram(pageName: string) {
    this.headerservice.navigateDegreesPage(pageName);
  }
  // navigateToIndividualPages(name:String){
  //   let data={
  //     type:name
  //   }
  //   console.log(data);
  // this.headerservice.navigateToIndividualProgram(data).subscribe((data:any)=>{
  //   console.log(data);
  // });
  // }
  courseEffect() {
    this.hoverEffect = true;
  }
  getPrograms() {
    this.headerservice.programsSearch().subscribe((data: any) => {
      // console.log(data);
      this.programList = data.data;
      console.log(this.programList);
    })
  }
  getDegrees() {
    this.headerservice.degreesSearch().subscribe((data: any) => {
      this.degreesList = data.data.future;
    })
  }
  //   @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const number = window.scrollY;
  //   if (number > 200) {
  //     this.fixed = true;
  //   } else if (this.fixed && number < 10) {
  //     this.fixed = false;
  //   }
  // }
  courseDataLoader() {
    let data: any =  [
      {
        _id: '5aa8ebf6696a920e6c862062',
        name: 'DevOps',
        slug: 'devops-course-training-hyderabad'
      },
      {
        _id: '5ab2541f80eedd173c60ff34',
        name: 'AWS',
        slug: 'aws-course-training-hyderabad'
      },
      {
        _id: '5ab2553a80eedd173c60ff38',
        name: 'Azure',
        slug: 'azure-course-training-hyderabad'
      },
      {
        _id: '5aa8f28c6245080ef60f1d03',
        name: 'FullStack',
        slug: 'fullstack-course-training-hyderabad'
      },
      {
        _id: '5aa8fb3ff14c6c10ec6a04c1',
        name: 'Python',
        slug: 'python-course-training-hyderabad'
      },
      {
        _id: '5aa8f4566245080ef60f1d09',
        name: 'Data Science',
        slug: 'data-science-course-training-hyderabad'
      },
      {
        _id: '5aa8fc59f14c6c10ec6a04d3',
        name: 'Deep Learning',
        slug: 'deep-learning-course-training-hyderabad'
      },
      {
        _id: '5ab5eb2264facb0bf2127d1f',
        name: 'Machine Learning',
        slug: 'machine-learning-course-training-hyderabad'
      },
      {
        _id: '5aa8fe37f14c6c10ec6a04f1',
        name: 'Big Data',
        slug: 'big-data-course-training-hyderabad'
      },
      {
        _id: '5aa8fdd3f14c6c10ec6a04eb',
        name: 'Artificial Intelligence',
        slug: 'artificial-intelligence-course-training-hyderabad'
      },
      {
        _id: '5aa8fab1d2a2e110bddb56dd',
        name: 'Data Analysis',
        slug: 'data-analysis-course-training-hyderabad'
      },
      {
        _id: '5aa8ff3ff14c6c10ec6a0503',
        name: 'Blockchain',
        slug: 'blockchain-course-training-hyderabad'
      },
      {
        _id: '5aa8fca4f14c6c10ec6a04d9',
        name: 'Digital Marketing',
        slug: 'digital-marketing-course-training-hyderabad'
      },
      {
        _id: '5aa8ff03f14c6c10ec6a04fd',
        name: 'Game Development',
        slug: 'game-development-course-training-hyderabad'
      }
    ];
return data;
  }

  programDataLoader(){
    let data: any = {
      placement: [
        {
          _id: '5aad1b9dd23a0b1d94bdd97a',
          name: 'Fullstack with Python',
          slug: 'pystack-program'
        },
        {
          _id: '5abf96def837971ef83eeb33',
          name: 'Fullstack program',
          slug: 'fullstack-program'
        },
        {
          _id: '5abf9a34f837971ef83eeb52',
          name: 'Devops engineer program',
          slug: 'devops-engineer-program'
        },
        {
          _id: '5abf9ebdf837971ef83eeb6b',
          name: 'AWS program',
          slug: 'aws-program'
        },
        {
          _id: '5abfa214f837971ef83eeb99',
          name: 'Python engineer program',
          slug: 'python-engineer-program'
        },
        {
          _id: '5abfc2a1f837971ef83eec34',
          name: 'Machine learning foundation',
          slug: 'machine-learning-program'
        },
        {
          _id: '5abfa5b4f837971ef83eebb5',
          name: 'Digital marketing executive',
          slug: 'digital-marketing-program'
        }
      ],
      academic: [
        {
          _id: '5abf5c93f837971ef83ee9da',
          name: 'FSIT',
          slug: 'fsit-program'
        },
        {
          _id: '5abf9377f837971ef83eeb26',
          name: 'Get Hackathon ready',
          slug: 'campus-interview-program'
        },
        {
          _id: '5abf5d0bf837971ef83ee9e0',
          name: 'Campus interview programs',
          slug: 'campus-interview-program'
        }],
        other:[
        {
          _id: '5abf5d0bf837971ef83ee9w0',
          name: 'Entrepreneurship Program',
          slug: 'entrepreneurship-program'
        }]
      
    };
    return data;
  }
  degreeDataLoader(){
    let data: any =  [
      {
        _id: '5aa8ebf6696a920e6c862062',
        name: 'Future iot',
        slug: 'future-degree-iot'

      }
    ];
    return data;

  }
}
