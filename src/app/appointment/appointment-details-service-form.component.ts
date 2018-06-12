import { Component, Input, OnInit } from '@angular/core';

import { AppointmentDetails } from './appointment-details';

import { ServiceService } from '../services/service.service';

@Component({
  selector: 'service-form',
  templateUrl: './appointment-details-service-form.component.html',
  styles: [`.mat-select {
              width: 250px;
            }

            mat-form-field {
              width: 70px;
            }`]
})
export class AppointmentDetailsServiceFormComponent implements OnInit {
  
  @Input() serviceSelected: AppointmentDetails;

  basePrice;
  toolTipBasePrice;

  constructor(private serviceService: ServiceService) {  }

  ngOnInit(): void {
    this.serviceService.getService(this.serviceSelected.service.id).then(service => {
      this.basePrice = service.price;
      this.priceChanged();
    });
  }

  priceChanged(): void {
    if (this.serviceSelected.price != this.basePrice)
      this.toolTipBasePrice = "Au lieu de " + this.basePrice + " CHF";
    else
      this.toolTipBasePrice = "";
  }
}
