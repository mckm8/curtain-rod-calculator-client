import {Component, OnInit} from '@angular/core';
import {StepperComunicationService} from "../../services/stepper-comunication.service";
import {Order} from "../stepper/product";
import {CalculationService} from "../../services/calculation.service";
import {IMAGES_PATH} from "../../configuration/paths";
import {AppConfigService} from "../../services/app-config.service";
import {MatDialog} from "@angular/material";
import {ImagePreviewComponent} from "./image-preview/image-preview.component";

@Component({
  selector: 'app-product-tray',
  templateUrl: './product-tray.component.html',
  styleUrls: ['./product-tray.component.css']
})
export class ProductTrayComponent implements OnInit {

  order: Order;
  totalPrice: number;
  itemsToBuy: number;

  constructor(public stepperComunicationService: StepperComunicationService,
              private appConfig: AppConfigService,
              public calculationService: CalculationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.order = this.stepperComunicationService.order;
  }

  getPrice() {
    return this.calculationService.calculate(this.order);
  }

  getItemsCount() {
    return this.calculationService.getItemsCount(this.getPrice(), this.appConfig.pricePerElement);
  }

  getImgUrl(filename: string) {
    return IMAGES_PATH + filename;
  }

  openImage(imageUrl: string) {
    if ('images/null'!==imageUrl) {
      this.dialog.open(ImagePreviewComponent, {
        height: '90%',
        width: '90%',
        data: {
          imageUrl: imageUrl
        }
      });
    }
  }
}
