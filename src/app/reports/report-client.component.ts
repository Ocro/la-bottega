import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import { ReportService } from './report.service';

@Component({
	selector: 'report-client',
	templateUrl: './report-client.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportClientComponent implements OnInit {
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
    this.reportService.getReport(1, this.month, this.year).then(reports => { 
      let result = [];
      
      this.total = 0;
      this.total_reduce = 0;

      if (reports.length > 0) {

        let current: any = {};
        let currentService: any = {};

        // Format raw JSON into array.
        for (let report of reports) {
          this.total += +report['service_price'];
          this.total_reduce += +report['appointment_price'];
          
          if (!current.title) {
            current.title = report['client_name'];
            current.amount = +report['service_price'];
            current.amount_reduce = +report['appointment_price'];
            current.services = [];
          } else if (current.title == report['client_name']) {
            current.amount += +report['service_price'];
            current.amount_reduce += +report['appointment_price'];
          } else {
            current.services.push(currentService);
            result.push(current);
            current = {};
            current.title = report['client_name'];
            current.amount = +report['service_price'];
            current.amount_reduce = +report['appointment_price'];
            current.services = [];
            currentService = {};
          }

          if (!currentService.title) {
            currentService.title = report['service'];
            currentService.amount = +report['service_price'];
            currentService.amount_reduce = +report['appointment_price'];
            currentService.services = [];
          } else if (currentService.title == report['service']) {
            currentService.amount += +report['service_price'];
            currentService.amount_reduce += +report['appointment_price'];
          } else {
            current.services.push(currentService);
            currentService = {};
            currentService.title = report['service'];
            currentService.amount = +report['service_price'];
            currentService.amount_reduce = +report['appointment_price'];
            currentService.services = [];
          }
        }

        current.services.push(currentService);
        result.push(current);
      }

      this.reports = result;
    });
  }

  ngOnInit(): void {
    this.getReports();
  }
}
