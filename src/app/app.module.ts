import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpModule }    from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home.component';

import { ClientsListComponent } from './clients/clients-list.component';
import { ClientService } from './clients/client.service';
import { ClientDialogCreateComponent } from './clients/client-dialog-create.component';
import { ClientDialogComponent } from './clients/client-dialog.component';
import { ClientDialogEditComponent } from './clients/client-dialog-edit.component';
import { ClientDialogDeleteComponent } from './clients/client-dialog-delete.component';
import { ClientPipe } from './clients/client.pipe';

import { ServiceComponent } from './services/service.component';
import { ServicesListComponent } from './services/services-list.component';
import { ServiceService } from './services/service.service';
import { ServiceDialogCreateComponent } from './services/service-dialog-create.component';
import { ServiceDialogUpdateComponent } from './services/service-dialog-update.component';
import { ServiceDialogDeleteComponent } from './services/service-dialog-delete.component';

import { AppointmentService } from './appointment/appointment.service';

import { AppointmentDetailsAddFormComponent } from './appointment/appointment-details-add-form.component';
import { AppointmentDetailsServiceFormComponent } from './appointment/appointment-details-service-form.component';

import { ReportClientComponent } from './reports/report-client.component';
import { ReportDateComponent } from './reports/report-date.component';
import { ReportServiceComponent } from './reports/report-service.component';
import { ReportClientsListComponent } from './reports/report-clients-list.component';
import { ReportService } from './reports/report.service';

import { ReportToolsComponent } from './reports/report-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsListComponent,
    ClientDialogComponent,
    ClientDialogCreateComponent,
    ClientDialogEditComponent,
    ClientDialogDeleteComponent,
    ClientPipe,
    ServiceComponent,
    ServicesListComponent,
    ServiceDialogCreateComponent,
    ServiceDialogUpdateComponent,
    ServiceDialogDeleteComponent,
    AppointmentDetailsAddFormComponent,
    AppointmentDetailsServiceFormComponent,
    ReportClientComponent,
    ReportDateComponent,
    ReportServiceComponent,
    ReportToolsComponent,
    ReportClientsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ClientService,
    ServiceService,
    AppointmentService,
    ReportService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ClientDialogComponent,
    ClientDialogCreateComponent,
    ClientDialogEditComponent,
    ClientDialogDeleteComponent,
    ServiceDialogCreateComponent,
    ServiceDialogUpdateComponent,
    ServiceDialogDeleteComponent,
  ]
})
export class AppModule { }
