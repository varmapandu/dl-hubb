import { Injectable } from "@angular/core";
import { Http, Request, Headers } from "@angular/http";

@Injectable()
export class CommonService {

  constructor() { }
  displayName = "";
    getAuthorizationHeader ():any {
        let headers = new Headers();
        var token = localStorage.getItem("JNToken");
        var userName = localStorage.getItem("userName");
        headers.append('Authorization', token);
        headers.append('userName', userName);
          return headers;
    }
    setToken(token,userName) {
        localStorage.setItem("JNToken", token);
        localStorage.setItem("userName", userName);
    }

}
