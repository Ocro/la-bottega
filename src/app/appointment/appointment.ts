import { AppointmentDetails } from './appointment-details';

import { Client } from '../clients/client';

export class Appointment {
  id: number;
  client: Client;
  date: string;
  appointmentsDetails: AppointmentDetails[];
}