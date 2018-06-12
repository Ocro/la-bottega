import { MatDialog } from '@angular/material';
import { Component, OnInit, OnDestroy, Host } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from '../app.component';

import { Service } from './service';
import { ServiceService } from './service.service';
import { ServiceDialogDeleteComponent } from './service-dialog-delete.component';
import { ServiceDialogUpdateComponent } from './service-dialog-update.component';

@Component({
  selector: 'services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit, OnDestroy {
	services: Service[];

	public loadingComplete = false;

	constructor(
		  @Host() private parent: AppComponent,
    	private serviceService: ServiceService,
    	private dialog: MatDialog) { }

	getServices(): void {
		this.serviceService.getServices().then(services => { this.services = services; this.loadingComplete = true; });
	}

	openServiceDeleteDialog(idService: number): void {
		let dialogRef = this.dialog.open(ServiceDialogDeleteComponent);
		dialogRef.componentInstance.initialize(idService);

		dialogRef.afterClosed().subscribe(dialogResult => {
			dialogResult && dialogResult.then(deleteResult => {
				let message;

				if (deleteResult) {
					message = "Le service a été supprimé.";

					this.services.splice(this.services.indexOf(this.services.find(s => s.id == idService)), 1);

				} else {
					message = "Impossible de supprimer un service utilisé dans un rendez-vous.";
				}

				this.parent.openSnackBar(message, "Fermer");

			});
		});
	}

	openServiceUpdateDialog(idService: number): void {
		let dialogRef = this.dialog.open(ServiceDialogUpdateComponent);
		dialogRef.componentInstance.initialize(idService);

		dialogRef.afterClosed().subscribe(dialogResult => {
			dialogResult && dialogResult.then(updateResult => {
				let message;

				if (updateResult) {
					message = "Le service a été modifié.";

					this.serviceService.getService(idService).then(service => { 
						this.services[this.services.indexOf(this.services.find(s => s.id == idService))] = service; 
					});

				} else {
					message = "Une erreur est survenue lors de la modification du service.";
				}

				this.parent.openSnackBar(message, "Fermer");

			});
		});
	}

	ngOnInit(): void {
    	this.getServices();

			this.parent.serviceCreated = new Subject<null>();
	    this.parent.serviceCreated.subscribe(event => {
	    	this.getServices();
	    });
  	}

  ngOnDestroy() {
    this.parent.serviceCreated.unsubscribe();
  }
}
