import { MatDialog } from '@angular/material';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'report-tools',
	templateUrl: './report-tools.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportToolsComponent {

  static CURRENT_YEAR = new Date().getFullYear();

  years = Array(10).fill(ReportToolsComponent.CURRENT_YEAR).map(function (x, i) { return x - i });
  
  detailsBox: Boolean = true;
  amountBox: Boolean = false;
  @Input() monthSelect: number;
  @Input() yearSelect: number;
  @Input() showDisplayDetails: Boolean = false;

  months = [
    {value: 1, viewValue: 'Janvier'},
    {value: 2, viewValue: 'Février'},
    {value: 3, viewValue: 'Mars'},
    {value: 4, viewValue: 'Avril'},
    {value: 5, viewValue: 'Mai'},
    {value: 6, viewValue: 'Juin'},
    {value: 7, viewValue: 'Juillet'},
    {value: 8, viewValue: 'Août'},
    {value: 9, viewValue: 'Septembre'},
    {value: 10, viewValue: 'Octobre'},
    {value: 11, viewValue: 'Novembre'},
    {value: 12, viewValue: 'Décembre'},
  ];

  @Output() detailsChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() amountChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() monthChanged: EventEmitter<null> = new EventEmitter<null>();
  @Output() yearChanged: EventEmitter<null> = new EventEmitter<null>();
}
