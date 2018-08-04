import {Injectable, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ApexService {

     sessionUserEvent: EventEmitter<any>  = new EventEmitter( );
     menuEvent:  EventEmitter<any>  = new EventEmitter( );
     loaderEvent: EventEmitter<any>  = new EventEmitter( );
     sessionPageInfoEvent: EventEmitter<any>  = new EventEmitter( );
     metaDataEvent: EventEmitter<any>  = new EventEmitter( );

    constructor(private _domSanitizer: DomSanitizer){

    }
    sessionUserEmit (sessionUser: any) {
        this.sessionUserEvent.emit(sessionUser);
    }
    sessionPageInfoEmit (sessionPageInfo: any) {
        this.sessionPageInfoEvent.emit(sessionPageInfo);
    }
    metaDataEmit (sessionMetaData: any) {
        this.metaDataEvent.emit(sessionMetaData);
    }
    bypassURL(url: string):any{
        return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}