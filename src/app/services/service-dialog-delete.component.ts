import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

import { Service } from './service';
import { ServiceService } from './service.service';

@Component({
  selector: 'service-dialog-delete',
  templateUrl: './service-dialog-delete.component.html',
  styles: []
})
export class ServiceDialogDeleteComponent {

	service: Service;

	constructor(private dialogRef: MatDialogRef<ServiceDialogDeleteComponent>,
				private serviceService: ServiceService) { }

	initialize(idService: number): void {
		this.serviceService.getService(idService).then(service => this.service = service);
	}

	deleteService(): void {
		this.dialogRef.close(this.serviceService.deleteService(this.service.id));
	}
}
