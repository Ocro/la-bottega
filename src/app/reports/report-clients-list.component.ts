import { MatDialog } from '@angular/material';
import { Component, OnInit, Host } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from '../app.component';

import { Client } from '../clients/client';
import { ClientService } from '../clients/client.service';
import { ClientDialogComponent } from '../clients/client-dialog.component';
import { ClientDialogEditComponent } from '../clients/client-dialog-edit.component';
import { ClientDialogDeleteComponent } from '../clients/client-dialog-delete.component';

@Component({
	selector: 'report-clients-list',
	templateUrl: './report-clients-list.component.html',
	styleUrls: ['./report-clients-list.component.css']
})
export class ReportClientsListComponent implements OnInit {
	private PREFIX_CLIENT = "clt-"
  static CURRENT_YEAR = new Date().getFullYear();
  years = Array(10).fill(ReportClientsListComponent.CURRENT_YEAR).map(function (x, i) { return x - i });

	clients: Client[];
	yearSelect: Number = ReportClientsListComponent.CURRENT_YEAR;
	public loadingComplete = false;

	constructor(
		@Host() public parent: AppComponent,
		private clientService: ClientService,
		private dialog: MatDialog) { }

	getClients(): void {
		this.clientService.getClientsNoVisitSince(this.yearSelect).then(clients => { this.clients = clients; this.loadingComplete = true; });
	}

	yearChanged($event): void {
		this.yearSelect = $event;
		this.clients = [];
		this.loadingComplete = false;
		this.getClients();
	}

	openClientDialog(idClient: number): void {
		let dialogRef = this.dialog.open(ClientDialogComponent, {
			width: '1000px',
			height: '750px'
		});
		dialogRef.componentInstance.initialize(idClient);

		dialogRef.afterClosed().subscribe(dialogResult => {
			switch (dialogResult) {
				case 'edit': 
					this.openClientEditDialog(idClient);
				break;
				case 'delete':
					this.openClientDeleteDialog(idClient);
				break;
			}
		});
	}

	openClientEditDialog(idClient: number): void {
		let dialogRef = this.dialog.open(ClientDialogEditComponent, {
			width: '1000px',
			height: '750px'
		});
		dialogRef.componentInstance.initialize(idClient);

		dialogRef.componentInstance.clientUpdated.subscribe(client => this.getClients());

		dialogRef.afterClosed().subscribe(dialogResult => {
			
			dialogRef.componentInstance.clientUpdated.unsubscribe();

			switch (dialogResult) {
				case 'back': 
					this.openClientDialog(idClient);
				break;
				case 'delete':
					this.openClientDeleteDialog(idClient);
				break;
			}
		});
	}

	openClientDeleteDialog(idClient: number): void {
		let dialogRef = this.dialog.open(ClientDialogDeleteComponent);
		dialogRef.componentInstance.initialize(idClient);

		dialogRef.afterClosed().subscribe(dialogResult => {
			dialogResult && dialogResult.then(deleteResult => {
				let message;

				if (deleteResult) {
					message = "Le client a été supprimé.";
					this.getClients();

				} else {
					message = "Une erreur est survenue lors de la suppression du client.";
				}

				this.parent.openSnackBar(message, "Fermer");

			});
		});
	}

	ngOnInit(): void {
		this.getClients();
	}
}
