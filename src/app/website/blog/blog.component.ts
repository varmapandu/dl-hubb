import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogsData: any;  
  imageHost:any;

  constructor(private blogService: BlogService) {
    this.blogSearch();
  }

  blogSearch() {
    let searchObj: any = {}
    searchObj.name = "Blogs";
    searchObj.getBy = "all";
    this.blogService.blogsSearch(searchObj).subscribe((data: any) => {
      this.blogsData = data.data.blogs;
      console.log(this.blogsData);
      this.imageHost = this.blogService.imageHost;
      this.blogService.storageSave(data.data);
    })
  }

  ngOnInit() {
  }
  pageNavigate(eventName: any) {
    this.blogService.navigatePage(eventName);
  }
}
