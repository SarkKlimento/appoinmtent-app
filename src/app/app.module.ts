import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './shared/app-routing.module';
import {AppComponent} from './app.component';
import {AppointmentCreationComponent} from './pages/appointment-creation/appointment-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {SalesforceRestCalloutService} from './shared/services/salesforce-rest-callout.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/api';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    AccordionModule,
    HttpClientModule,
    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    SalesforceRestCalloutService,
    MessageService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
