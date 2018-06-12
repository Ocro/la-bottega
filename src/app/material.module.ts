import { NgModule } from '@angular/core';

import { CustomDateAdapter } from './inc/customdateadapter';
import { DateAdapter } from '@angular/material';

import { MatButtonModule, 
	     MatToolbarModule,
	     MatSidenavModule,
	     MatListModule,
       MatDialogModule,
       MatFormFieldModule,
       MatInputModule,
       MatDatepickerModule,
       MatNativeDateModule,
       MatSelectModule,
       MatProgressSpinnerModule,
       MatCardModule,
       MatGridListModule,
       MatMenuModule,
       MatSnackBarModule,
       MatExpansionModule,
       MatTooltipModule,
       MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
        MatButtonModule, 
  			MatToolbarModule, 
  			MatSidenavModule, 
  			MatListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatMenuModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCheckboxModule],

  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],

  exports: [
        MatButtonModule, 
  			MatToolbarModule, 
  			MatSidenavModule, 
  			MatListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatMenuModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCheckboxModule],
})
export class MaterialModule { }