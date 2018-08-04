import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApexService } from './service/apex.service';
import { ReportService } from './service/report.service';

import { AppService } from './service/app.service';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppImgUploadComponent } from './component/app.imgupload.component';
import { AppImgLoadComponent } from './component/app.imgload.component';
import { FormMessagesComponent } from './component/form.messages.component';
import { AppCropImgComponent } from './component/app.imgcrop.component';
import { SearchBarComponent } from './component/search-bar.component';
import {AppImgCardComponent} from './component/app.imgcard.component';
import {CardAComponent} from './cards/card-a.component';
import {CardBComponent} from './cards/card-b.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CCPaymentComponent } from './component/app.payment.component';
import { FilterPipe, KeyValuesPipe, DecodeURIPipe, DatePipe, DateTimePipe, FlagPipe, CurrencyPipe } from './utils/pipes';


@NgModule({
    imports: [
        CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,
        ImageCropperModule

    ],
    declarations: [
        FilterPipe, KeyValuesPipe, DecodeURIPipe, DatePipe, DateTimePipe, FlagPipe, CurrencyPipe, 
        FormMessagesComponent, AppImgUploadComponent, AppImgLoadComponent, AppCropImgComponent,
        SearchBarComponent,AppImgCardComponent,CardAComponent,CardBComponent, CCPaymentComponent
    ],
    exports: [
        CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule,
        FilterPipe, KeyValuesPipe, DecodeURIPipe, DatePipe, DateTimePipe, FlagPipe, CurrencyPipe, 
        FormMessagesComponent, AppImgUploadComponent, AppImgLoadComponent,
        AppImgLoadComponent, AppCropImgComponent,
        SearchBarComponent,AppImgCardComponent,CardAComponent,CardBComponent, CCPaymentComponent

    ],
    providers: []

})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ApexService,
                ReportService,
                AppService,
            ],
        };
    }
}