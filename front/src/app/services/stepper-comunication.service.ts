import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Circle, Color, Ending, Order, ProductGroup, Rod, Support} from "../components/stepper/product";
import {IMAGES_PATH} from "../configuration/paths";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class StepperComunicationService {

  colorChangedSubject: Subject<object> = new Subject<object>();
  productGroupChangedSubject: Subject<object> = new Subject<object>();
  rodLengthChangedSubject: Subject<object> = new Subject<object>();
  rodsCountChangedSubject: Subject<number> = new Subject<number>();
  supportChangedSubject: Subject<object> = new Subject<object>();
  supportCountChangedSubject: Subject<number> = new Subject<number>();
  endingChangedSubject: Subject<object> = new Subject<object>();
  ending2ChangedSubject: Subject<object> = new Subject<object>();
  endingCountChangedSubject: Subject<number> = new Subject<number>();
  circleChangedSubject: Subject<object> = new Subject<object>();
  circleCountChangedSubject: Subject<number> = new Subject<number>();

  order: Order;

  constructor() {
    this.order = new Order();
    this.productGroupChangedSubject.subscribe(value => {
      this.order.productGroup = <ProductGroup>value;
      console.log(this.order);
      this.order.color = null;
      this.order.rodCount = null;
      this.order.length = null;
      this.order.supportType = null;
      this.order.endingType = null;
      this.order.ending2Type = null;
      this.order.circleType = null;
    });
    this.colorChangedSubject.subscribe(value => {
      this.order.color = <Color>value;
      this.order.rodCount = null;
      this.order.length = null;
      this.order.supportType = null;
      this.order.endingType = null;
      this.order.ending2Type = null;
      this.order.circleType = null;
    });
    this.rodLengthChangedSubject.subscribe(value => {
      this.order.length = <Rod>value;
    });
    this.rodsCountChangedSubject.subscribe(value => {
      this.order.rodCount = value;
      this.order.ending2Type = null;
    });
    this.supportChangedSubject.subscribe(value => {
      this.order.supportType = <Support>value;
    });
    this.supportCountChangedSubject.subscribe(value => {
      this.order.supportCount = value;
    });
    this.endingChangedSubject.subscribe(value => {
      this.order.endingType = <Ending>value;
    });
    this.ending2ChangedSubject.subscribe(value => {
      this.order.ending2Type = <Ending>value;
    });

    this.endingCountChangedSubject.subscribe(value => {
      this.order.endingCount = value;
    });
    this.circleChangedSubject.subscribe(value => {
      this.order.circleType = <Circle>value;
    });
    this.circleCountChangedSubject.subscribe(value => {
      this.order.circleCount = value;
    })
  }

  getImgUrl(filename: string){
    return window.location.origin + '/kalkulator/images/' + filename;
  }
}
