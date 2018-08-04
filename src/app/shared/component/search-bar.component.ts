import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchBarComponent),
  multi: true
};

@Component({
  selector: 'app-search-bar',
  template: ` 

  <form id="demo-2">
    <input type="search" placeholder="Search" id="searchBarId" (input)="onChange($event)" [ngClass]="{'expand':expand, 'expandinput':expand}">
  </form>
  `,
  styles: [

    `
    input {
      outline: none;
  }
  input[type=search] {
      -webkit-appearance: textfield;
      -webkit-box-sizing: content-box;
      font-family: inherit;
      font-size: 100%;
      position: absolute;
      right: 0;
      top: 0;
  }
  .expand{
    display:block;

    color: #000;
    font-size:25px;
    background-color: #fff;
    cursor: auto;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none !important;
  }
#demo-2 .expandinput[type=search] {
  background: #ededed url("https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png") no-repeat 25px center;  
  color: #000;
  width: 275px;
  font-size:25px;
  background-color: #fff;
  cursor: auto;
  display:block;
  padding-left: 50px;

}
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
      display: none; 
  }
  
  
  input[type=search] {
      background: #ededed url("https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png") no-repeat 25px center;
      padding: 14px 11px 17px 0px;
      width: 55px;
      -webkit-transition: all .5s;
      -moz-transition: all .5s;
      transition: all .5s;
  }
    #demo-2 input[type=search] {
      width: 39px;
      padding-left: 10px;
      color: transparent;
      cursor: pointer;
   float:right;
  height:29px;
   
  }
 

  #demo-2 input[type=search]:focus {
      width: 350px;
      padding-left: 50px;
      color: #000;
      font-size:25px;
      background-color: #fff;
      cursor: auto;
   display:block;
   
  }
  #demo-2 input:-moz-placeholder {
      color: transparent;
  }
  #demo-2 input::-webkit-input-placeholder {
      color: transparent;
  }
    
        
   `

  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchBarComponent),
    multi: true
  }]
})
export class SearchBarComponent implements ControlValueAccessor {
  expand: boolean;

  constructor() {


  }
  _value = '';
  propagateChange: any = () => { };
  writeValue(value: any) {
    if (value) {
      this._value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: () => void): void { }

  onChange(event) {
    this.propagateChange(event.target.value);
  }
  clear() {
    document.getElementById('searchBarId')['value'] = '';
    this.propagateChange('');
  }

  @HostListener('document:click', ['$event'])

  clickedOutside($event) {
    var getVal = document.getElementById('searchBarId');
    console.log(getVal['value'])
    if (getVal['value'] != "") {
      this.expand = true;
    }
    else if(getVal['value'] == ""){
      this.expand = false;
    }
  }

}