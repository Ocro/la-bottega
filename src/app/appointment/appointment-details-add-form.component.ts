import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AppointmentService } from './appointment.service';
import { AppointmentDetailsServiceFormComponent } from './appointment-details-service-form.component';
import { AppointmentDetails } from './appointment-details';

import { ServiceService } from '../services/service.service';

@Component({
  selector: 'appointment-details-add-form',
  templateUrl: './appointment-details-add-form.component.html',
  styleUrls: ['./appointment-details-add-form.component.css']
})
export class AppointmentDetailsAddFormComponent implements OnInit {

  APPLY_CREATE_BUTTON_TEXT = "Créer le rendez-vous";
  APPLY_COPY_BUTTON_TEXT = "Copier le rendez-vous";
  APPLY_UPDATE_BUTTON_TEXT = "Modifier le rendez-vous";

  applyButtonText = this.APPLY_CREATE_BUTTON_TEXT;
  isUpdating = false;
  isCopying = false;

  services: AppointmentDetails[];
  @Input() idClient: number;
  @Output() appointmentCreated: EventEmitter<null> = new EventEmitter<null>();
  @Output() appointmentUpdateOrCopyCancelled: EventEmitter<null> = new EventEmitter<null>();

  servicesSelected = new FormControl();
  serviceDate: string;

  private idUpdatingAppointment;

  constructor(private serviceService: ServiceService,
              private appointmentService: AppointmentService) {  }

  getServices(): void {

    // Todo construct
    this.serviceService.getServices().then(services => this.services = services.map(service => { 
      return { id: null, service: service, price: service.price, color: null, comment: "" }; 
    }));
  }

  initDate(): void {
    this.serviceDate = new Date().toISOString();
  }

  reinitFields(): void {
    this.applyButtonText = this.APPLY_CREATE_BUTTON_TEXT;
    this.isUpdating = false;
    this.isCopying = false;
    this.initDate();
    this.getServices();
    this.servicesSelected = new FormControl();
  }

  addAppointmentCompleted(): void {
    this.appointmentCreated.emit();
    this.reinitFields();
  }

  initialize(appointment): void {

    // ToDo: Is there a better way of doing this? Using an Input member from client-dialog-component
    //       corresponding to the list of AppointmentDetails?

    // Select services corresponding to the appointment parameter.
    let values = this.services.filter(service => 
        appointment.appointmentsDetails.find(apService => 
          apService.service.id == service.service.id) !== undefined);

    // Update values of services with the appointment values parameter.
    values.forEach(service => appointment.appointmentsDetails.forEach(apService => {
      if (service.service.id == apService.service.id) {
        service.comment = apService.comment;
        service.price = apService.price;
        service.color = apService.color;
      }
    }));

    this.servicesSelected.setValue(values);
  }

  copy(appointment): void {

    this.applyButtonText = this.APPLY_COPY_BUTTON_TEXT;
    this.isUpdating = false;
    this.isCopying = true;

    this.initialize(appointment);
  }

  update(appointment): void {

    this.applyButtonText = this.APPLY_UPDATE_BUTTON_TEXT;
    this.isCopying = false;
    this.isUpdating = true;

    this.serviceDate = new Date(appointment.date).toISOString();
    this.idUpdatingAppointment = appointment.id;
    this.initialize(appointment);

  }

  ngOnInit(): void {
    this.getServices();
    this.initDate();
  }

  createAppointment(): void {
    if (this.isUpdating) {
      this.appointmentService.updateAppointment(this.idClient, this.serviceDate, this.idUpdatingAppointment, this.servicesSelected.value)
          .then(response => response ? this.addAppointmentCompleted() : console.log("Erreur lors de la modification du rendez-vous."));
    } else {
      this.appointmentService.createAppointment(this.idClient, this.serviceDate, this.servicesSelected.value)
          .then(response => response ? this.addAppointmentCompleted() : console.log("Erreur lors de la créaton du rendez-vous."));
    }
  }

  reinitDefaultState(): void {

  }

  cancelUpdateOrCopyAppointment(): void {
    this.reinitFields();
    this.appointmentUpdateOrCopyCancelled.emit();
  }
}
