import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Client } from './client';

import { Globals } from '../globals';

@Injectable()
export class ClientService {

  private clientUrl = Globals.API_LINK + 'client/';

  constructor (private http: Http) { }

  getClients(): Promise<Client[]> {
    return this.http.get(this.clientUrl + 'read.php')
               .toPromise()
               .then(response => response.json() as Client[])
               .catch(this.handleError);
  }

  getClient(id: number): Promise<Client> {
    return this.http.get(this.clientUrl + 'read.php?id=' + id)
               .toPromise()
               .then(response => response.json()[0] as Client)
               .catch(this.handleError);
  }

  getClientsNoVisitSince(year: Number): Promise<Client[]> {
    return this.http.get(this.clientUrl + 'clean.php?year=' + year)
               .toPromise()
               .then(response => response.json() as Client[])
               .catch(this.handleError);
  }

  createClient(client: Client): Promise<Boolean> {
    return this.http.post(this.clientUrl + 'create.php', 
                  { 
                    name: client.name,
                    firstname: client.firstname,
                    address: client.address,
                    phone: client.phone,
                    city: client.city, 
                    npa: client.npa 
                  })
               .toPromise()
               .then(response => response.json() as Number)
               .catch(this.handleError);
  }

  updateClient(client: Client): Promise<Boolean> {
    return this.http.post(
                  this.clientUrl + 'update.php', 
                  { 
                    id: client.id, 
                    name: client.name,
                    firstname: client.firstname,
                    address: client.address,
                    phone: client.phone,
                    city: client.city, 
                    npa: client.npa 
                  })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  deleteClient(id: number): Promise<Boolean> {
    return this.http.post(this.clientUrl + 'delete.php', { id: id })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
