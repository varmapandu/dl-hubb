import {Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';


@Component({
  selector: 'img-crop',
  template: `
    <section class="inline-block">
      <a class="btn btn-primary" href="javascript: void(0)"
      onclick="document.getElementById('inputImage').click()">upload image</a>
      <input id="inputImage" type="file" accept="image/x-png,image/jpeg" class="hide" (change)="fileChangeEvent($event)" hidden>
    </section>
    <section class="crop-container" *ngIf="isShow === true">
      <div class="crop-box">
        <div class="crop-box-header" style="text-align:center" >
          <button (click)="onApply()" class="apply">apply</button>
          <button (click)="onCancel()" class="cancel">cancel</button>
        </div>
        <div class="crop-box-body">
          <figure style="height: 300px;">
            <image-cropper id="cropper-image" class="full-width"
              [imageChangedEvent]="imageChangedEvent"
              [maintainAspectRatio]="true"
              [aspectRatio]="1 / 1"
              [resizeToWidth]="320"
              format="png"
              (imageCropped)="imageCropped($event)"></image-cropper>
          </figure>
         
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hide {
  display: none;
}

.crop-container {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1111;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 25px;
}

.crop-box {
  background-color: #fff;
  border-radius: 3px;
  width: 520px;
}

.crop-box .crop-box-header {
  border-bottom: 1px solid #ddd;
  padding: 12px;
  position: relative;
}

.crop-box .crop-box-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
}

.crop-box .crop-box-body {
  padding: 10px;
}


.inline-block {
  display: inline-block;
}

button {

	-moz-border-radius:20px;
	-webkit-border-radius:20px;
	border-radius:20px;
	border:1px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:8px 30px;
	text-decoration:none;
}
button:focus{
  outline: none;
}
button:active {
	position:relative;
	top:1px;
}
.apply{
	background-color:#44c767;
}
.cancel{
  background-color:#ffaa22;
}

  `]
})
export class AppCropImgComponent implements AfterViewInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  private fileName: string;
  private fileType: string;
  private dom: HTMLInputElement;
  public isShow: boolean = false;
  //private cropper: Cropper;

  @Output()
  outputEvent: EventEmitter<any> =  new EventEmitter<any>();
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  public ngAfterViewInit() {
    //  init upload btn, after dom content loaded init down.
    setTimeout(() => {
      const dom = (this.dom = document.getElementById('inputImage') as HTMLInputElement);
      this.dom.onchange = () => {
        const files = dom.files;
        if (files && files.length > 0) {
          this.isShow = true;
        }
      };
    }, 0);
  }
  public onCancel() {
    this.isShow = false;
  }
  public onApply() {
      this.outputEvent.next(this.croppedImage);
      this.isShow = false;
  }
}