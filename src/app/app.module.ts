import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteModule } from '../app/website/website.module';
import { AuthModule } from '../app/auth/auth.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/website/header/header.component';
import { FooterComponent } from './website/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './apex/menu/menu.component';
import { CallusComponent } from './website/callus/callus.component';
import { CommonService } from './service/common.service';
import { AdminloginComponent } from './website/adminlogin/adminlogin.component';
import { RegistrationComponent } from './website/registration/registration.component';
import { GoldComponent } from './website/membership/gold/gold.component';
import { SilverComponent } from './website/membership/silver/silver.component';
import { PlatinumComponent } from './website/membership/platinum/platinum.component';



// import { appRoutes, appRoutingProviders } from './app.routes';
// import { NgxCarouselModule } from 'ngx-carousel';
// import 'hammerjs';
// import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll'; 
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    CallusComponent,
    AdminloginComponent,
    RegistrationComponent,
    GoldComponent,
    SilverComponent,
    PlatinumComponent,
  
  

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'digital-lync' }),
    AuthModule,
    WebsiteModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    HttpClientModule,
    BrowserTransferStateModule,
    //appRoutes,
    //NgxCarouselModule
    //SimpleSmoothScrollModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
