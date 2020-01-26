import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {StepperComunicationService} from "../../../../services/stepper-comunication.service";
import {AppConfigService} from "../../../../services/app-config.service";
import {CalculationService} from "../../../../services/calculation.service";

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss']
})
export class OrderCompletedComponent implements OnInit {
  screenWidth = window.innerWidth;

  pricePerElement: number;
  totalPrice: number;
  itemsToBuy: number;
  allegroUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private stepperComunicationService: StepperComunicationService,
              private appConfig: AppConfigService,
              private calculationService: CalculationService) {

  }

  ngOnInit() {
    this.pricePerElement = this.appConfig.pricePerElement;
    this.totalPrice = this.calculationService.calculate(this.stepperComunicationService.order);
    this.itemsToBuy = this.calculationService.getItemsCount(this.totalPrice, this.pricePerElement);
    this.allegroUrl = this.appConfig.allegroUrl;
  }



}
