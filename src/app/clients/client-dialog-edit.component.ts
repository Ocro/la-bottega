import { MatDialogRef } from '@angular/material';
import { Component, Host } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { AppComponent } from '../app.component';

import { Client } from './client';
import { ClientService } from './client.service';

import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';

import { AppointmentDetailsAddFormComponent } from '../appointment/appointment-details-add-form.component';

@Component({
  selector: 'client-dialog-edit',
  templateUrl: './client-dialog-edit.component.html',
  styleUrls: ['./client-dialog-edit.component.css'],
  providers: [ AppComponent ]
})
export class ClientDialogEditComponent {

	client: Client;
  clientName: string;
  clientFirstname: string;
  clientNpa: string;
  clientCity: string;
  clientPhone: string;
	appointments: Appointment[];

  public clientUpdated = new Subject<null>();

	constructor(
		@Host() private parent: AppComponent,
		private dialogRef: MatDialogRef<ClientDialogEditComponent>,
		private clientService: ClientService,
		private appointmentService: AppointmentService) { }

	private formatDate(date: Date): string {
    if (!date)
      return "Inconnue";

		let tmp = date.toString().split(" ")[0].split("-");
		return tmp[2] + "." + tmp[1] + "." + tmp[0];
	}

  deleteAppointment(idAppointment: number): void {
    this.appointmentService.deleteAppointment(idAppointment).then(response => {
    	let message;

    	if (response) {

        // TODO: Regroup messages.
    		message = "Le rendez-vous a été supprimé.";
				this.appointments.splice(this.appointments.indexOf(this.appointments.find(s => s.id == idAppointment)), 1);
    	} else {
    		message = "Un problème est survenu lors de la suppression du rendez-vous.";
    	}
			this.parent.openSnackBar(message, "Fermer");
    });
  }

	initialize(idClient: number): void {
		this.clientService.getClient(idClient).then(client => {
      this.client = client
      this.clientName = this.client.name;
      this.clientFirstname = this.client.firstname;
      this.clientNpa = this.client.npa;
      this.clientCity = this.client.city;
      this.clientPhone = this.client.phone;
    });
		this.appointmentService.getClientAppointments(idClient).then(aps => this.appointments = aps);
	}

  updateClient(): void {
    this.clientService.updateClient(
    {
      id: this.client.id,
      name: this.clientName,
      firstname: this.clientFirstname,
      phone: this.clientPhone,
      address: null,
      npa: this.clientNpa,
      city: this.clientCity
    }).then(response => {
      let message;

      if (response) {
        message = "Les informations ont été modifiées.";
        this.client.name = this.clientName;
        this.client.firstname = this.clientFirstname;
        this.client.npa = this.clientNpa;
        this.client.city = this.clientCity;
        this.client.phone = this.clientPhone;
        this.clientUpdated.next();
      } else {
        message = "Un problème est survenu lors de la modification des informations.";
      }
      this.parent.openSnackBar(message, "Fermer");
    });
  }

  quitEditMode(): void {
    if (this.hasChanges()) {
      if (confirm('Des modifications non enregistrées sont en cours.\nLes modifications seront perdues si vous continuer.\nVoulez-vous quitter le mode édition?'))
        this.dialogRef.close('back');
    } else
      this.dialogRef.close('back');
  }

  hasChanges(): boolean {
    return this.clientName != this.client.name ||
           this.clientFirstname != this.client.firstname ||
           this.clientNpa != this.client.npa ||
           this.clientCity != this.client.city ||
           this.clientPhone != this.client.phone;
  }
}
