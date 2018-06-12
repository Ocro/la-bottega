import { MatDialogRef } from '@angular/material';
import { Component, ViewChild } from '@angular/core';

import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'client-dialog-create',
  templateUrl: './client-dialog-create.component.html',
  styles: []
})
export class ClientDialogCreateComponent {

	client: Client;

	constructor(private dialogRef: MatDialogRef<ClientDialogCreateComponent>,
				      private clientService: ClientService) {
    this.client = new Client();
  }

	createClient(): void {
		this.dialogRef.close(this.clientService.createClient(this.client));
	}

  swapNames(): void {
    let buf = this.client.name;
    this.client.name = this.client.firstname;
    this.client.firstname = buf;
  }

  swapLocations(): void {
    let buf = this.client.npa;
    this.client.npa = this.client.city;
    this.client.city = buf;
  }

  enableSwapNames(): boolean {
    return this.client.name != undefined && this.client.name != "" ||
           this.client.firstname != undefined && this.client.firstname != "";
  }

  enableSwapLocations(): boolean {
    return this.client.city != undefined && this.client.city != "" ||
           this.client.npa != undefined && this.client.npa != "";
  }
}
