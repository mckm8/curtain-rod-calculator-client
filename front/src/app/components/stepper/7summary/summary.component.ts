import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {MatCheckboxChange, MatDialog, MatSnackBar} from "@angular/material";
import {OrderToSend} from "../order-to-send";
import {OrderCompletedComponent} from "./order-completed/order-completed.component";
import {LoaderService} from "../../../services/loader-service.service";
import {AppConfigService} from "../../../services/app-config.service";
import {OrderPreviewComponent} from "./order-preview/order-preview.component";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @ViewChild('orderPreview') orderPreviewComponent: OrderPreviewComponent;

  rodoConfirmed: boolean = false;

  summaryFormGroup: FormGroup;
  orderToSend: OrderToSend = new OrderToSend();
  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private loaderService: LoaderService,
              private appConfig: AppConfigService) {
  }

  get f() {
    return this.summaryFormGroup.controls;
  }

  ngOnInit() {
    this.summaryFormGroup = new FormGroup({
      emailCtrl: new FormControl('', [Validators.email, Validators.required]),
      phoneNumberCtrl: new FormControl('', Validators.required),
      allegroNickCtrl: new FormControl(''),
      additionalInfoCtrl: new FormControl('')
    });
  }

  onSubmit($event: Event) {
    if(this.rodoConfirmed){
      console.log(this.summaryFormGroup.value);
      console.log(this.stepperComunicationService.order);
      console.log($event);
      //todo zmienic link

      this.orderToSend.email = this.summaryFormGroup.value.emailCtrl;
      this.orderToSend.phoneNumber = this.summaryFormGroup.value.phoneNumberCtrl;
      this.orderToSend.allegroNick = this.summaryFormGroup.value.allegroNickCtrl;
      this.orderToSend.additionalInformations = this.summaryFormGroup.value.additionalInfoCtrl;
      this.orderToSend.rodLengthDef = window.location.origin + window.location.pathname + "rodLengthDef/" + this.stepperComunicationService.order.length.id;
      this.orderToSend.rodCount = this.stepperComunicationService.order.rodCount;
      this.orderToSend.productGroupDef = window.location.origin + window.location.pathname + "productGroupDef/" + this.stepperComunicationService.order.productGroup.id;
      this.orderToSend.colorDef = window.location.origin + window.location.pathname + "colorDef/" + this.stepperComunicationService.order.color.id;
      this.orderToSend.supportDef = window.location.origin + window.location.pathname + "supportDef/" + this.stepperComunicationService.order.supportType.id;
      this.orderToSend.supportCount = this.stepperComunicationService.order.supportCount;
      this.orderToSend.endingDef = window.location.origin + window.location.pathname + "endingDef/" + this.stepperComunicationService.order.endingType.id;
      if (this.stepperComunicationService.order.ending2Type){
        this.orderToSend.endingDef2 = window.location.origin + window.location.pathname + "endingDef2/" + this.stepperComunicationService.order.ending2Type.id;
      }
      this.orderToSend.endingCount = this.stepperComunicationService.order.endingCount;
      this.orderToSend.circleDef = window.location.origin + window.location.pathname + "circleDef/" + this.stepperComunicationService.order.circleType.id;
      this.orderToSend.circleCount = this.stepperComunicationService.order.circleCount;
      this.orderToSend.pricePerElement = this.appConfig.pricePerElement;
      this.orderToSend.redirectUrl = this.appConfig.allegroUrl;
      // this.orderToSend.price = this.stepperComunicationService.
      this.orderToSend.status = 'ZLOZONE';

      this.loaderService.startLoader("Dodawanie kalkulacji... Proszę czekać...");
      this.restService.postOrder(this.orderToSend).subscribe(value => {
        this.restService.sendMail(value['id']).subscribe(value1 => {
          this.loaderService.stopLoader();
          this.onCorrectlySubmited(value);
        })
      }, error1 => {
        this.loaderService.stopLoader();
      })
    } else {
      this.snackBar.open("Zaznacz zgodę na przetwarzanie danych osobowych aby przejść dalej.",
        null,
        {duration: 2000})
    }

  }

  onCorrectlySubmited(itemId: any) {
    const dialogRef = this.dialog.open(OrderCompletedComponent, {
      data: {
        title: 'Usuwanie zakończenia',
        header: 'Czy napewno chcesz wpis z zakończeniem?',
        confirmName: 'Usuń'
      }
    });
  }

  fillOrderToShow() {
    this.orderPreviewComponent.fillOrderToPresentation();
  }

  onchange(matcheckboxChange: MatCheckboxChange){
    this.rodoConfirmed = matcheckboxChange.checked;
  }
}
