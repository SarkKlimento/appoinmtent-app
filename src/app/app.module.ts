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
import {SalesforceRESTcalloutServiceService} from './shared/services/salesforce-restcallout-service.service';
import {HttpClientModule} from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [SalesforceRESTcalloutServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
