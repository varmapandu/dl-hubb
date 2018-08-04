import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange
} from "@angular/core";
import { Props } from './../../apex/common/props'
@Component({
  selector: "card-b",
  template: `
      <div class="card-wrapper">
          <ng-template ngFor let-icard [ngForOf]="cardList" let-i="index">
              <div class="card-el"> 
                  <div class="img-box">
                      <div class="cardb">
                        <div class="">
                            <img alt="placeholder" [src]="imageHost+icard.image" height="100px" class="img-responsive margin-auto x" style="width:300px;"/>                        
                          <h4 class="text-center">{{icard.name}}</h4>
                          <p>{{icard.description}}</p>
                        </div>
                      </div>
                  </div>
              </div>
          </ng-template>
      </div>
   `,
  styles: [
    `
    .card-wrapper{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        
        }
        .card-el{
        text-align: center;
        margin: 8px;
        }
        .img-box {
        width: 100%;
        height: auto;
        overflow: unset;
        background: transparent;
        position: sticky;
        }
        .cardb{
        background-color: #ffffff;
        text-align:left;
        min-width:300px;
        }
        .text-center{
          text-align:center;
        }
        .card-img{
          width:300px;
        }
   `
  ]
})
export class CardBComponent {
  public imageHost = Props.IMAGE_HOST;
  @Output() outputEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() inputData: any;
  cardList: any;
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty("inputData")) {
      this.cardList = JSON.parse(JSON.stringify(this.inputData));
      if (this.cardList) {
        this.doService(this.cardList);
      }
    }
  }
  doService(cardList: any[]) {
    this.cardList = cardList;
  }
}
