import { MatDialog } from '@angular/material';
import { Component, OnInit, OnDestroy, Host } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from '../app.component';

import { Client } from './client';
import { ClientService } from './client.service';
import { ClientDialogComponent } from './client-dialog.component';
import { ClientDialogEditComponent } from './client-dialog-edit.component';
import { ClientDialogDeleteComponent } from './client-dialog-delete.component';
import { ClientPipe } from './client.pipe';

@Component({
	selector: 'clients-list',
	templateUrl: './clients-list.component.html',
	styleUrls: ['./clients-list.component.css'],
	providers: [ClientPipe]
})
export class ClientsListComponent implements OnInit, OnDestroy {
	private PREFIX_CLIENT = "clt-"

	clients: Client[];
	public loadingComplete = false;

	constructor(
		@Host() public parent: AppComponent,
		private clientService: ClientService,
		private dialog: MatDialog,
		private clientPipe: ClientPipe) { }

	getClients(): void {
		this.clientService.getClients().then(clients => { this.clients = clients; this.loadingComplete = true; });
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

		this.parent.validateSearch = new Subject<null>();
    this.parent.validateSearch.subscribe(event => {
    	let results = this.clientPipe.transform(this.clients, this.parent.searchText);

    	if (results.length == 0)
    		this.parent.openClientCreateDialog();
    	else
    		this.openClientDialog(results[0].id);
    });

		this.parent.clientCreated = new Subject<number>();
    this.parent.clientCreated.subscribe(event => {
    	this.getClients();
    	this.openClientDialog(event);
    });
	}

  ngOnDestroy() {
    this.parent.validateSearch.unsubscribe();
    this.parent.clientCreated.unsubscribe();
  }
}
