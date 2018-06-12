import { MatDialogRef } from '@angular/material';
import { Component, Host, ViewChild, ElementRef } from '@angular/core';

import { MatExpansionPanel } from '@angular/material/expansion';

import { AppComponent } from '../app.component';

import { Client } from './client';
import { ClientService } from './client.service';

import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';

import { AppointmentDetailsAddFormComponent } from '../appointment/appointment-details-add-form.component';

@Component({
  selector: 'client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css'],
  providers: [ AppComponent ]
})
export class ClientDialogComponent {

  ADD_APPOINTMENT_TITLE_TEXT = "Ajouter un rendez-vous";
  COPY_APPOINTMENT_TITLE_TEXT = "Copier un rendez-vous";
  UPDATE_APPOINTMENT_TITLE_TEXT = "Modifier un rendez-vous";

  addAppointmentTitleText = this.ADD_APPOINTMENT_TITLE_TEXT;

	client: Client;
	appointments: Appointment[] = [];
  buffSumAppointmentDetails = 0;
  buffSumReduceAppointmentDetails = 0;

  @ViewChild('dialogContent') dialogContent: ElementRef;
  @ViewChild('expansionAddAppointment') expansionAddAppointment: MatExpansionPanel;
	@ViewChild('appointmentAddForm') appointmentAddForm: AppointmentDetailsAddFormComponent;

	constructor(
    @Host() private parent: AppComponent,
		private dialogRef: MatDialogRef<ClientDialogComponent>,
		private clientService: ClientService,
		private appointmentService: AppointmentService) { }

	private formatDate(date: Date): string {
    if(!date)
      return "Inconnue";

		let tmp = date.toString().split(" ")[0].split("-");
		return tmp[2] + "." + tmp[1] + "." + tmp[0];
	}

  appointmentInteractionCompleted(): void {
    this.expansionAddAppointment.expanded = false;
    this.initialize(this.client.id);
    this.addAppointmentTitleText = this.ADD_APPOINTMENT_TITLE_TEXT;
  }

  copyAppointment(appointment): void {
    this.addAppointmentTitleText = this.COPY_APPOINTMENT_TITLE_TEXT;
    this.openAppointmentForm();
    this.appointmentAddForm.copy(appointment);
  }

  updateAppointment(appointment): void {
    this.addAppointmentTitleText = this.UPDATE_APPOINTMENT_TITLE_TEXT;
    this.openAppointmentForm();
    this.appointmentAddForm.update(appointment);
  }

	initialize(idClient: number): void {
		this.clientService.getClient(idClient).then(client => this.client = client);
		this.appointmentService.getClientAppointments(idClient).then(aps => this.appointments = aps);
	}

  getAppointmentSumReduce(appointment: Appointment) {
    return this.buffSumReduceAppointmentDetails = appointment.appointmentsDetails.map(ad => +ad.price).reduce((a, b) => a + b, 0);
  }

  getAppointmentSum(appointment: Appointment) {
    return this.buffSumAppointmentDetails = appointment.appointmentsDetails.map(ad => +ad.service.price).reduce((a, b) => a + b, 0);
  }

  deleteAppointment(appointment): void {
    this.appointmentService.deleteAppointment(appointment.id).then(response => {
      let message;

      if (response) {
        message = "Le rendez-vous a été supprimé.";
        this.appointments.splice(this.appointments.indexOf(this.appointments.find(s => s.id == appointment.id)), 1);
      } else {
        message = "Un problème est survenu lors de la suppression du rendez-vous.";
      }
      this.parent.openSnackBar(message, "Fermer");
    });
  }

  private openAppointmentForm(): void {
    this.dialogContent.nativeElement.scrollTop = 0;
    this.expansionAddAppointment.expanded = true;
  }
}
