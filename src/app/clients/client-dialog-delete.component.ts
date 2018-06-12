import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'client-dialog-delete',
  templateUrl: './client-dialog-delete.component.html',
  styles: []
})
export class ClientDialogDeleteComponent {

  client: Client;

  constructor(private dialogRef: MatDialogRef<ClientDialogDeleteComponent>,
        private clientService: ClientService) { }

  initialize(idClient: number): void {
    this.clientService.getClient(idClient).then(client => this.client = client);
  }

  deleteClient(): void {
    this.dialogRef.close(this.clientService.deleteClient(this.client.id));
  }
}
