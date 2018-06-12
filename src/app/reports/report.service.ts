import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Globals } from '../globals';

@Injectable()
export class ReportService {

  private reportUrl = Globals.API_LINK + 'report/';
  
  constructor (private http: Http) { }

  getReport(type: number, month: number, year: number): Promise<any[]> {
    return this.http.get(this.reportUrl + 'read.php?type=' + type + '&month=' + month + '&year=' + year)
               .toPromise()
               .then(response => response.json() as any[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
