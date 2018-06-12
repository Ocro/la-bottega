import { Service } from '../services/service'

export class AppointmentDetails {
	id: number;
	service: Service;
	price: number;
	color: string;
	comment: string;
}