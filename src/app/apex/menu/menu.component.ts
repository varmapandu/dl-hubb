import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Menu } from './menu.interface';
//import { ApexService } from '../../shared/service/apex.service';
import { RouterLinkActive } from '@angular/router';
import { Storage } from './../../shared/utils/storage';
import { ApexService } from './../../shared/service/apex.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  //private _menuSubscription: any;
  menuList: any[];
  activeMenuObject: any;
  isActive:boolean = false;
  states:any = {};
  @Input() inputData;
  
  constructor(private apexService: ApexService, private router: Router) { 
 
    this.states.activeItem = 'ADMIN_DASHBOARD';
    this.roleMenuAccess();
  }
  ngOnInit() {
  }
  roleMenuAccess() {
    this.menuList = [];
      this.menus().forEach( (item) => {
            this.menuList.push(item);
            console.log(this.menuList)
          
      })
  }

  menus() {
    return [
      {
        "id": 'USERS',
        "name": "Users",
        "link": "userslist",
        "icon": "user_management"
      },
      {
        "id": 'PROFILES',
        "name": "My Profile",
        "link": "myProfile",
        "icon": "profile"
      }
    ]
  }
  logout(){
    Storage.clearSession();
    sessionStorage.clear();
    this.apexService.sessionUserEmit(null);
    this.router.navigate(['signin'])
  }
}
