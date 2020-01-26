import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RestService} from "../../services/rest.service";
import {ProductGroupStepComponent} from "./1product-group-step/product-group-step.component";
import {ColorStepComponent} from "./2color-step/color-step.component";
import {StepperComunicationService} from "../../services/stepper-comunication.service";
import {SupportStepComponent} from "./4support-step/support-step.component";
import {EndingStepComponent} from "./5ending-step/ending-step.component";
import {CircleStepComponent} from "./6circle-step/circle-step.component";
import {RodLengthStepComponent} from "./3rod-length-step/rod-length-step.component";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {SummaryComponent} from "./7summary/summary.component";
import {EndingStep2Component} from "./ending-step2/ending-step2.component";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  screenWidth = window.innerWidth;

  @ViewChild('ProductGroupStepComponent') productGroupStepComponent: ProductGroupStepComponent;
  @ViewChild('ColorStepComponent') colorsStepComponent: ColorStepComponent;
  @ViewChild('RodLengthStepComponent') rodLengthStepComponent: RodLengthStepComponent;
  @ViewChild('SupportStepComponent') supportStepComponent: SupportStepComponent;
  @ViewChild('EndingStepComponent') endingStepComponent: EndingStepComponent;
  @ViewChild('EndingStep2Component') endingStep2Component: EndingStep2Component;
  @ViewChild('CircleStepComponent') circleStepComponent: CircleStepComponent;
  @ViewChild('SummaryComponent') summaryStepComponent: SummaryComponent;

  constructor(private _formBuilder: FormBuilder,
              private productGroupService: RestService,
              private stepperComunicationService: StepperComunicationService) {
  }


  get productGroupStepForm() {
    return this.productGroupStepComponent ? this.productGroupStepComponent.productGroupFormGroup : null;
  }

  get colorStepForm() {
    return this.colorsStepComponent ? this.colorsStepComponent.colorsFormGroup : null;
  }

  get supportStepForm() {
    return this.supportStepComponent ? this.supportStepComponent.supportsFormGroup : null;
  }

  get endingStepForm() {
    return this.endingStepComponent ? this.endingStepComponent.endingsFormGroup : null;
  }

  get endingStep2Form() {
    return this.endingStep2Component ? this.endingStep2Component.endings2FormGroup : null;
  }

  get circleStepForm() {
    return this.circleStepComponent ? this.circleStepComponent.circlesFormGroup : null;
  }

  get rodLengthStepForm() {
    return this.rodLengthStepComponent ? this.rodLengthStepComponent.rodLengthsFormGroup : null;
  }

  isProductGroupCompleted() {
    return !!this.stepperComunicationService.order.productGroup;
  }

  isProductColorCompleted() {
    return !!this.stepperComunicationService.order.color;
  }

  isProductRodCompleted() {
    // return this.stepperComunicationService.order.length.length && !!this.stepperComunicationService.order.rodCount;
    return this.stepperComunicationService.order.length && !!this.stepperComunicationService.order.rodCount;
  }

  isProductSupportCompleted() {
    return !!this.stepperComunicationService.order.supportType;
  }

  isProductEndingCompleted() {
    return !!this.stepperComunicationService.order.endingType;
  }

  isProductEnding2Completed() {
    return !!this.stepperComunicationService.order.ending2Type;
  }

  isProductCircleCompleted() {
    return !!this.stepperComunicationService.order.circleType;
  }

  ngOnInit() {
  }

  onSelectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex >= 6 ){
      this.summaryStepComponent.fillOrderToShow();
    }
  }
}
