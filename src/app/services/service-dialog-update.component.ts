import { MatDialogRef } from '@angular/material';
import { Component, ViewChild } from '@angular/core';

import { Service } from './service';
import { ServiceComponent } from './service.component';
import { ServiceService } from './service.service';

@Component({
  selector: 'service-dialog-update',
  templateUrl: './service-dialog-update.component.html',
  styles: []
})
export class ServiceDialogUpdateComponent {

	@ViewChild(ServiceComponent) service: ServiceComponent;

	constructor(private dialogRef: MatDialogRef<ServiceDialogUpdateComponent>,
				private serviceService: ServiceService) { }

	initialize(idService: number): void {
		this.serviceService.getService(idService).then(service => this.service.service = service);
	}

	updateService(): void {
		this.dialogRef.close(this.serviceService.updateService(this.service.service));
	}
}
