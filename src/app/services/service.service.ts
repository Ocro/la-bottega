import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Service } from './service';

import { Globals } from '../globals';

@Injectable()
export class ServiceService {

  private serviceUrl = Globals.API_LINK + 'service/';
  
  constructor (private http: Http) { }

  getServices(): Promise<Service[]> {
    return this.http.get(this.serviceUrl + 'read.php')
               .toPromise()
               .then(response => response.json() as Service[])
               .catch(this.handleError);
  }

  getService(id: number): Promise<Service> {
    return this.http.get(this.serviceUrl + 'read.php?id=' + id)
               .toPromise()
               .then(response => response.json()[0] as Service)
               .catch(this.handleError);
  }

  deleteService(id: number): Promise<Boolean> {
    return this.http.post(this.serviceUrl + 'delete.php', { id: id })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  createService(service: Service): Promise<Boolean> {
    return this.http.post(this.serviceUrl + 'create.php', { service: service.service, price: service.price })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  updateService(service: Service): Promise<Boolean> {
    return this.http.post(this.serviceUrl + 'update.php', { id: service.id, service: service.service, price: service.price })
               .toPromise()
               .then(response => response.json() as Boolean)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
