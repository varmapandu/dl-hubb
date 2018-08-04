import {Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

import {Props} from './../../apex/common/props';

@Component({
  selector: 'img-card',
  template: `
    <div fxFlex='100' fxFlex.xs="50" fxFlex.sm="33.3333" fxFlex.md="25" fxFlex.lg="20" fxFlex.xl="16.6667" (click)="onAction(id)">
        <div class="card-resp-img">
        <div class="img-box">
            <img [src]="src" [alt]="alt"/>
        </div>
        <div class="box">
                {{label}}
            <br/>
        </div>
        </div>
    </div>
  `,
  styles: [`
  .img-box {
    width: 100%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    background: transparent;
  }
  .img-box img {
    position: relative;
    height: auto;
    left: 50%;
    -moz-transform: translate(-50%);
    -ms-transform: translate(-50%);
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
  }
  .card-resp-img {
      background: transparent;
      background: rgba(0,0,0,0.4);
      color:#fff;
      height: 213px; 
    }
    .card-resp-img {
    height: 213px; 
    border: 1px solid green; 
    margin: 5px;
    display: flex;
    flex-direction: column;
  }
  
  .card-resp-img .box{
    position: relative;
    bottom: 0px;
    width: 100%;
    background: rgba(0,0,0,0.4);
    color:#fff;
    height: 90px;
    padding: 2px;
  } 
  
  
  `]
})

export class AppImgCardComponent implements AfterViewInit {
  public imageHost = Props.IMAGE_HOST;
  @Output()
  outputEvent: EventEmitter<any> =  new EventEmitter<any>();
  
  @Input()
    src: string = null;

    @Input()
    label: string = null;

    @Input()
    id: string = null;
    
    @Input()
    alt: string = null;
  
  public ngAfterViewInit() {
    //  init upload btn, after dom content loaded init down.
   
  }

  onAction(id: string){
      this.outputEvent.emit(this.id)
  }
}