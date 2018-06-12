import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Subject';

import { ServiceDialogCreateComponent } from './services/service-dialog-create.component';

import { Client } from './clients/client';
import { ClientDialogCreateComponent } from './clients/client-dialog-create.component';

import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'La Bottega';
	public searchText: string;
  public validateSearch = new Subject<null>();
  public clientCreated = new Subject<number>();
  public serviceCreated = new Subject<null>();

  public backupLink = Globals.API_LINK + 'config/dump.php';

	constructor(
		public snackBar: MatSnackBar,
		private dialog: MatDialog,
		private router: Router) {}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, { duration: 4000 });
	}

	openServiceCreateDialog(): void {
		let dialogRef = this.dialog.open(ServiceDialogCreateComponent);

		dialogRef.afterClosed().subscribe(dialogResult => {
			dialogResult && dialogResult.then(createResult => {
				let message;

				if (createResult) {
					message = "Le service a été créé.";
          this.serviceCreated.next();

					//todo: ajouter service dans liste this.services.splice(this.services.indexOf(this.services.find(s => s.id == idService)), 1);

				} else {
					message = "Une erreur est survenue lors de l'ajout du service.";
				}

				this.openSnackBar(message, "Fermer");

			});
		});
	}

	capitalizeFirstLetter(text): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
	}

	extractClientFromSearchBar(): Client {

		if (this.searchText === undefined || this.searchText.length == 0)
			return new Client();

    let terms = this.searchText.split(" ").filter(term => term.length > 0);
    let termsLength = terms.length;
    let client = new Client();
    client.name = termsLength > 0 ? this.capitalizeFirstLetter(terms[0]) : "";
    client.firstname = termsLength > 1 ? this.capitalizeFirstLetter(terms[1]) : "";
    client.npa = termsLength > 2 ? this.capitalizeFirstLetter(terms[2]) : "";
    client.city = termsLength > 3 ? this.capitalizeFirstLetter(terms[3])  : "";
    return client;
	}

	openClientCreateDialog(): void {
		let dialogRef = this.dialog.open(ClientDialogCreateComponent);
		dialogRef.componentInstance.client = this.extractClientFromSearchBar();

		dialogRef.afterClosed().subscribe(dialogResult => {
			dialogResult && dialogResult.then(createResult => {
				let message;

				if (createResult >= 0) {
					message = "Le client a été créé.";
          this.clientCreated.next(createResult);


					// todo: ajouter client dans liste this.services.splice(this.services.indexOf(this.services.find(s => s.id == idService)), 1);

				} else {
					message = "Une erreur est survenue lors de l'ajout du client.";
				}

				this.openSnackBar(message, "Fermer");

			});
		});
	}

  clearSearchBar(): void {
    this.searchText = "";
  }

	startSearch($event): void {
		this.router.navigate(['/clients']);

		if ($event.keyCode == 13)
			this.validateSearch.next();
	}
}
