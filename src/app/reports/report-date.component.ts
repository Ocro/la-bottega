import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { ReportService } from './report.service';

@Component({
	selector: 'report-date',
	templateUrl: './report-date.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportDateComponent implements OnInit {

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
    this.reportService.getReport(0, this.month, this.year).then(reports => { 

      let result = [];
      
      this.total = 0;
      this.total_reduce = 0;

      if (reports.length > 0) {
        let current: any = {};
        let currentClient: any = {};
        let currentService: any = {};

        // Format raw JSON into array.
        for (let report of reports) {
          this.total += +report['service_price'];
          this.total_reduce += +report['appointment_price'];

          if (!current.title) {
            current.title = report['date'];
            current.amount = +report['service_price'];
            current.amount_reduce = +report['appointment_price'];
            current.clients = [];
          } else if (current.title == report['date']) {
            current.amount += +report['service_price'];
            current.amount_reduce += +report['appointment_price'];
          } else {
            currentClient.services.push(currentService);
            current.clients.push(currentClient);
            result.push(current);
            current = {};
            current.title = report['date'];
            current.amount = +report['service_price'];
            current.amount_reduce = +report['appointment_price'];
            current.clients = [];
            currentService = {};
            currentClient = {};
          }

          if (!currentClient.title) {
            currentClient.title = report['client_name'];
            currentClient.amount = +report['service_price'];
            currentClient.amount_reduce = +report['appointment_price'];
            currentClient.services = [];
          } else if (currentClient.title == report['client_name']) {
            currentClient.amount += +report['service_price'];
            currentClient.amount_reduce += +report['appointment_price'];
          } else {
            currentClient.services.push(currentService);
            current.clients.push(currentClient);
            currentClient = {};
            currentClient.title = report['client_name'];
            currentClient.amount = +report['service_price'];
            currentClient.amount_reduce = +report['appointment_price'];
            currentClient.services = [];
            currentService = {};
          }

          if (!currentService.title) {
            currentService.title = report['service'];
            currentService.amount = +report['service_price'];
            currentService.amount_reduce = +report['appointment_price'];
          } else if (currentService.title == report['service']) {
            currentService.amount += +report['service_price'];
            currentService.amount_reduce += +report['appointment_price'];
          } else {
            currentClient.services.push(currentService);
            currentService = {};
            currentService.title = report['service'];
            currentService.amount = +report['service_price'];
            currentService.amount_reduce = +report['appointment_price'];
          }
        }

        currentClient.services.push(currentService);
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
