import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppointmentDetails } from './appointment-details';

import { Appointment } from './appointment';

import { Globals } from '../globals';

@Injectable()
export class AppointmentService {

  private appointmentUrl = Globals.API_LINK + 'appointment/';  

  constructor (private http: Http) { }

  getClientAppointments(idClient: number): Promise<Appointment[]> {
    return this.http.get(this.appointmentUrl + 'readClient.php?id=' + idClient)
               .toPromise()
               .then(response => response.json() as Appointment[])
               .catch(this.handleError);
  }

  createAppointment(idClient: number, serviceDate: string, services: AppointmentDetails[]): Promise<Boolean> {
    return this.http.post(this.appointmentUrl + 'createClient.php', { idClient: idClient, serviceDate: serviceDate, services: services })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  updateAppointment(idClient: number, serviceDate: string, appointmentId: number, services: AppointmentDetails[]): Promise<Boolean> {
    return this.http.post(this.appointmentUrl + 'updateClient.php', { idClient: idClient, serviceDate: serviceDate, appointmentId: appointmentId, services: services })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  deleteAppointment(id: number): Promise<Boolean> {
    return this.http.post(this.appointmentUrl + 'delete.php', { id: id })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
