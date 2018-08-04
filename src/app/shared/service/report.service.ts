import { Injectable, Inject } from '@angular/core';

import { Util } from "../utils/util";
import { Storage } from "../utils/storage";
import { ApexService } from "./apex.service";
import { Props} from "../../apex/common/props";
import 'rxjs/add/operator/map'

export interface ErrorMessage{
    code: string;
    message: string;
}
@Injectable()
export class ReportService {

    headers: Headers;
    CONTENT_TYPE: string = "application/x-www-form-urlencoded";
    // CONTENT_TYPE : string = "application/json";
    public API_ENDPOINT: string;
    constructor(private apexService: ApexService) {

    }
    imgload(id) {
        let url = Props.API_END_POINT + '/img/' + id;
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();;
            xhr.open("GET", url);
            xhr.setRequestHeader("Content-type", this.CONTENT_TYPE);
            xhr.onreadystatechange = (() => {
                if (xhr.readyState == 0 || xhr.readyState == 4) {
                    var data = JSON.parse(xhr.response);
                    if (data.status == 1) {
                        resolve(data.data);
                    } else {
                        this.errorMessage(data.error);
                        reject(data);
                    }
                }
            });
            xhr.send();
        });
    }
    errorMessage(err: ErrorMessage) {
        // if(err.message) {
        //     this.apexService.showMessage(err.message);
        // } else if(err.code) {
        //     this.apexService.showMessage(err.code);
        // } else {
        //     this.apexService.showMessage(""+err);
        // }
        
    }
}


