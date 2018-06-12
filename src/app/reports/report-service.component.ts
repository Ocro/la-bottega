import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { ReportService } from './report.service';

@Component({
	selector: 'report-service',
	templateUrl: './report-service.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportServiceComponent implements OnInit {

  reports: any[];

  displayDetails: Boolean = true;
  displayAmount: Boolean = false;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  total = 0;
  total_reduce = 0;

	constructor(private reportService: ReportService) { }

  updateMonth(month): void {
    this.month = month;
    this.getReports();
  }

  updateYear(year): void {
    this.year = year;
    this.getReports();
  }

  getReports(): void {
    this.reportService.getReport(2, this.month, this.year).then(reports => { 
      let result = [];
      
      this.total = 0;
      this.total_reduce = 0;

      if (reports.length > 0) {

        let current: any = {};
        let currentClient: any = {};

        // Format raw JSON into array.
        for (let report of reports) {
          this.total += +report['service_price'];
          this.total_reduce += +report['appointment_price'];
          
          if (!current.title) {
            current.title = report['service'];
            current.amount = +report['service_price'];
            current.amount_reduce = +report['appointment_price'];
            current.clients = [];
          } else if (current.title == report['service']) {
            current.amount += +report['service_price'];
            current.amount_reduce += +report['appointment_price'];
          } else {
            current.clients.push(currentClient);
            result.push(current);
            current = {};
            current.title = report['service'];
            current.amount = +report['service_price'];
            current.amount_reduce = +report['appointment_price'];
            current.clients = [];
            currentClient = {};
          }

          if (!currentClient.title) {
            currentClient.title = report['client_name'];
            currentClient.amount = +report['service_price'];
            currentClient.amount_reduce = +report['appointment_price'];
            currentClient.clients = [];
          } else if (currentClient.title == report['client_name']) {
            currentClient.amount += +report['service_price'];
            currentClient.amount_reduce += +report['appointment_price'];
          } else {
            current.clients.push(currentClient);
            currentClient = {};
            currentClient.title = report['client_name'];
            currentClient.amount = +report['service_price'];
            currentClient.amount_reduce = +report['appointment_price'];
            currentClient.clients = [];
          }
        }

        current.clients.push(currentClient);
        result.push(current);
      }

      this.reports = result;
    });
  }

  ngOnInit(): void {
    this.getReports();
  }
}
