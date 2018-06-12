import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

import { Service } from './service';
import { ServiceService } from './service.service';

@Component({
  selector: 'service-dialog-create',
  templateUrl: './service-dialog-create.component.html',
  styles: []
})
export class ServiceDialogCreateComponent {

	constructor(private dialogRef: MatDialogRef<ServiceDialogCreateComponent>,
				private serviceService: ServiceService) { }

	createService(service): void {
		this.dialogRef.close(this.serviceService.createService(service));
	}
}
