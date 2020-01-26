import {Component, OnInit} from '@angular/core';
import {Circle, Color, Ending, Order, ProductGroup, Rod, Support} from "../../product";
import {StepperComunicationService} from "../../../../services/stepper-comunication.service";
import {CalculationService} from "../../../../services/calculation.service";

@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.scss']
})
export class OrderPreviewComponent implements OnInit {
  screenWidth = window.innerWidth;

  order: Order;

  productGroup: ProductGroup;
  color: Color;
  rodLength: Rod;
  support: Support;
  ending: Ending;
  ending2: Ending;
  circle: Circle;

  constructor(private stepperComunicationService: StepperComunicationService, private calculationService: CalculationService) {
  }

  ngOnInit() {

  }

  fillOrderToPresentation() {
    this.color = this.stepperComunicationService.order.color;
    this.productGroup = this.stepperComunicationService.order.productGroup;
    this.rodLength = this.stepperComunicationService.order.length;
    this.support = this.stepperComunicationService.order.supportType;
    this.ending = this.stepperComunicationService.order.endingType;
    this.ending2 = this.stepperComunicationService.order.ending2Type;
    this.circle = this.stepperComunicationService.order.circleType;
    this.order = this.stepperComunicationService.order;
  }

  // getPrice(){
  //   this.calculationService.calculate(this.order);
  // }
}

export interface ElementDescription {
  element: string;
  name: string;
  count: number;
  price: number;
}


