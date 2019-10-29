import {Component} from '@angular/core';
import {SalesforceRESTcalloutServiceService} from '../../shared/services/salesforce-restcallout-service.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-appointment-creation',
  templateUrl: './appointment-creation.component.html',
  styleUrls: ['./appointment-creation.component.css']
})
export class AppointmentCreationComponent {
  firstName: string;
  lastName: string;
  appointmentDate: Date;
  startTime: Date;
  endTime: Date;
  accountName: string;
  errorText: string;

  readonly headerString: string;
  readonly buttonString: string;
  readonly firstNameString: string;
  readonly lastNameString: string;
  readonly appointmentDateString: string;
  readonly startTimeString: string;
  readonly endTimeString: string;
  readonly accountNameString: string;
  readonly emptyFieldError: string;
  readonly successMessage: string;
  readonly errorMessage: string;

  private readonly accessToken: string;
  private readonly accessCode: string;

  constructor(private restService: SalesforceRESTcalloutServiceService,
              private messageService: MessageService) {
    this.accessCode = restService.getCodeFromURL();
    this.accessToken = restService.getToken();

    if ((this.accessCode === null || this.accessCode === undefined || this.accessCode.length === 0) &&
      (this.accessToken === null || this.accessToken === undefined || this.accessToken.length === 0)) {
      restService.authorize();
    } else if (this.accessCode) {
      restService.getTokens(this.accessCode).subscribe(next => console.log('Success of reg tokens operation!'));
    }

    this.headerString = 'Please, enter information below!';
    this.firstNameString = 'First Name';
    this.lastNameString = 'Last Name';
    this.appointmentDateString = 'Appointment Date';
    this.startTimeString = 'Start Time';
    this.endTimeString = 'End Time';
    this.accountNameString = 'Account Name';
    this.buttonString = 'Save';
    this.emptyFieldError = 'One of the fields is empty! To save data - please, fill all inputs!';
    this.successMessage = 'Record was created!';
    this.errorMessage = 'Some error was acquired!';
  }

  handleClick(event: Event, repeated: boolean = false): void {
    if (this.checkDataValidation()) {
      const requestBody = '{' +
        '"client_first_name": "' + this.firstName + '",' +
        '"client_last_name": "' + this.lastName + '",' +
        '"appointment_date": "' + this.appointmentDate.getFullYear() + '-' + this.appointmentDate.getMonth() + '-' +
        this.appointmentDate.getDay() + '",' +
        '"start_time": "' + this.startTime.getHours() + ':' + this.startTime.getMinutes() + '",' +
        '"end_time": "' + this.endTime.getHours() + ':' + this.endTime.getMinutes() + '",' +
        '"account_name": "' + this.accountName + '"' +
        '}';

      this.restService.sendRequestToSalesforce('Appointments', requestBody).subscribe(response => {
        this.handleResponse(response);
      }, error => {
        this.restService.handleTokenError(error, 'Appointments', requestBody).subscribe(response => {
          this.handleResponse(response);
        }, error => {
          console.error(error);
          this.messageService.add({severity: 'error', summary: 'Service Message', detail: this.errorMessage});
        });
      });
    } else {
      this.errorText = this.emptyFieldError;
    }
  }

  clearErrorMessage() {
    this.errorText = '';
  }

  checkDataValidation(): boolean {
    return (this.firstName && this.firstName.length > 0) &&
      (this.lastName && this.lastName.length > 0) &&
      this.appointmentDate && this.startTime && this.endTime &&
      (this.accountName && this.accountName.length > 0);
  }

  private handleResponse(response: any): void {
    if (response['Status'] === 'Success') {
      this.messageService.add({severity: 'success', summary: 'Service Message', detail: this.successMessage});
      this.clearInputs();
    } else {
      this.messageService.add({severity: 'error', summary: 'Service Message', detail: this.errorMessage});
    }
  }

  private clearInputs(): void {
    this.firstName = '';
    this.lastName = '';
    this.appointmentDate = null;
    this.startTime = null;
    this.endTime = null;
    this.accountName = '';
  }
}
