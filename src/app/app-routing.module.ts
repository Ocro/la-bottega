import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ClientsListComponent } from './clients/clients-list.component';
import { ServicesListComponent } from './services/services-list.component';

import { ReportClientComponent } from './reports/report-client.component';
import { ReportDateComponent } from './reports/report-date.component';
import { ReportServiceComponent } from './reports/report-service.component';
import { ReportClientsListComponent } from './reports/report-clients-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsListComponent },
  { path: 'services', component: ServicesListComponent },
  { path: 'reports/client', component: ReportClientComponent },
  { path: 'reports/date', component: ReportDateComponent },
  { path: 'reports/service', component: ReportServiceComponent },
  { path: 'reports/oldclient', component: ReportClientsListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}