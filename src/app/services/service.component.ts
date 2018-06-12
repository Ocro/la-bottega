import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

import { Service } from './service';

@Component({
  selector: 'service',
  templateUrl: './service.component.html',
  styles: []
})
export class ServiceComponent {

	service: Service;

  @Input() title: string = "Service";
  @Input() submitString: string = "Ok";
  @Output() onSubmit: EventEmitter<Service> = new EventEmitter<Service>();

	constructor() {
		this.service = new Service();
	}
}
