// import { Component, OnInit } from '@angular/core';
// import { NgxCarousel } from 'ngx-carousel';
// import {CarouselTileItems} from './data';

// @Component({
//   selector: 'app-carousel-contact',
//   templateUrl: './contactcarousel.component.html',
//   styleUrls: ['./contactcarousel.component.scss']
// })
// export class ContactcarouselComponent implements OnInit {

//   public carouselTileItems: Array<any>;
//   public carouselTile: NgxCarousel;

//   ngOnInit(){
//     this.carouselTileItems = CarouselTileItems;
//     this.carouselTile = {
//       grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
//       slide: 2,
//       speed: 400,
//       interval: 4000,
//       animation: 'lazy',
//       point: {
//         visible: true
//       },
//       load: 2,
//       touch: true,
//       easing: 'ease',
//       loop:true
//     }
//   }

//   public carouselTileLoad(evt: any) {

//     const len = this.carouselTileItems.length
//     if (len <= 30) {
//       for (let i = len; i < len; i++) {
//         this.carouselTileItems.push(i);
//       }
//     }

//   }
//   getBranch(item:any){
//       console.log(item);
        
//   }
// }