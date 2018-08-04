import {
  Component,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReportService } from '../service/report.service';

const loadingImg = `data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmY2ZDAwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjFzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgIDwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==`;

@Component({
  selector: 'img-load',
  template: `
                <div class="img-box">
                 <img  alt="placeholder"  [src]="placeholder" height="100px" style="border-radius:100%" /> 
                 </div>
            `,
  styles: [`.img-box {
    width: 100%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    background: transparent;
  }
  .img-box img {
    position: relative;
    height: 155px;
    left: 50%;
    -moz-transform: translate(-50%);
    -ms-transform: translate(-50%);
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
  }`],
})
export class AppImgLoadComponent implements OnChanges{

    @Input() img: any = null;
   innerValue: string = null;
   
   _placeHolderSafe: SafeUrl;

  constructor(private sanitizer: DomSanitizer, private reportService: ReportService) {
     this.imgChange();
  }
  
  get placeholder() {
    return this._placeHolderSafe;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('img')) {
        this.imgChange();
      }
    }


   imgChange() {
    
    if(!this.img){
      this.innerValue  = loadingImg;
      this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.innerValue);
    } else {
      if( this.img.id || this.img.length < 35) {
        let id: any = this.img.id ? this.img.id : this.img;
        this.reportService.imgload(this.img).then( (imgData: any) =>{
          this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(imgData.src);
        });
      } else {
          if(typeof this.img == "object" && this.img.src){
            this.innerValue  = this.img.src
          } else if(typeof this.img == "object" && !this.img.src){
            this.innerValue  = loadingImg;
          } else {
            this.innerValue  = this.img; 
          }
          this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this.innerValue);
      } 

    }
  }
}