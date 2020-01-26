import {Injectable} from '@angular/core';
import {Order} from "../components/stepper/product";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private appConfig: AppConfigService) {
  }

  calculate(order: Order): number {
    var rodPrice: number = 0;
    var supportsPrice: number = 0;
    var endingsPrice: number = 0;
    var endings2Price: number = 0;
    var circlesPrice: number = 0;
    if (order){
      if (order.length) {
        rodPrice = order.length['price'] * order.rodCount;
      }
      if (order.supportType) {
        supportsPrice = order.supportType['price'] * order.supportCount;
      }
      if (order.endingType) {
        endingsPrice = order.endingType['price'] * order.endingCount;
      }
      if (order.ending2Type) {
        endings2Price = order.ending2Type['price'] * order.endingCount;
      }
      if (order.circleType) {
        // circlesPrice = order.circleType['price'] * order.circleCount;
        circlesPrice = order.circleType['price'];
      }
    }
    return rodPrice + supportsPrice + endingsPrice + endings2Price + circlesPrice;
  }

  getItemsCount(totalPrice:number, pricePerElement){
    return Math.ceil(totalPrice/pricePerElement);
  }
}
