import {Component} from '@angular/core';
import {Time} from '@angular/common';
import {SalesforceRESTcalloutServiceService} from '../../shared/services/salesforce-restcallout-service.service';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.css']
})
export class AppointmentCreationComponent {
  firstName: string;
  secondName: string;
  appointmentDate: Date;
  startTime: Time;
  endTime: Time;
  accountName: string;
  errorText: string;

  readonly headerString: string;
  readonly buttonString: string;
  readonly firstNameString: string;
  readonly secondNameString: string;
  readonly appointmentDateString: string;
  readonly startTimeString: string;
  readonly endTimeString: string;
  readonly accountNameString: string;
  readonly emptyFieldError: string;
  readonly successMessage: string;

  constructor(private restService: SalesforceRESTcalloutServiceService) {
    this.headerString = 'Please, enter information below!';
    this.firstNameString = 'First Name';
    this.secondNameString = 'Second Name';
    this.appointmentDateString = 'Appointment Date';
    this.startTimeString = 'Start Time';
    this.endTimeString = 'End Time';
    this.accountNameString = 'Account Name';
    this.buttonString = 'Save';
    this.emptyFieldError = 'One of the fields is empty! To save data - please, fill all inputs!';
    this.successMessage = 'Record was created with id:';
  }

  handleClick(event: Event): void {
    if (this.checkDataValidation()) {
      console.log('Correct!');
      console.log(!this.firstName);
      this.restService.sendRequestToSalesforce('Appointments', '').subscribe(response => console.log(response));
      this.restService.sendAuthRequestToSalesforce('Appointments', '').subscribe(response => console.log(response));
      this.restService.sete().then(responce => console.log(responce));
    } else {
      this.errorText = this.emptyFieldError;
    }
  }

  clearErrorMessage() {
    this.errorText = '';
  }

  checkDataValidation(): boolean {
    return (this.firstName && this.firstName.length > 0) &&
      (this.secondName && this.secondName.length > 0) &&
      this.appointmentDate && this.startTime && this.endTime &&
      (this.accountName && this.accountName.length > 0);
  }
}
