import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {MatSelectChange, MatSnackBar} from "@angular/material";
import {LoaderService} from "../../../services/loader-service.service";

@Component({
  selector: 'app-rod-length-step',
  templateUrl: './rod-length-step.component.html',
  styleUrls: ['./rod-length-step.component.css']
})
export class RodLengthStepComponent implements OnInit {

  isSelected = false;
  rodLengthsFormGroup: FormGroup;
  rodLengths: any;

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.rodLengthsFormGroup = this._formBuilder.group({
      rodLengthCtrl: ['', Validators.required],
      rodsCountCtrl: ['', Validators.required]
    });
    this.stepperComunicationService.colorChangedSubject.subscribe(value => {
      this.rodLengthsFormGroup.controls.rodsCountCtrl.setValue("") ;
      this.refresh(this.stepperComunicationService.order.productGroup, value);
    })
  }

  rodLengthsChanged(event: MatSelectChange) {
    this.stepperComunicationService.rodLengthChangedSubject.next(event.value);
    if(!!this.stepperComunicationService.order.rodCount){
      this.isSelected = true;
    }
  }

  rodCountChanged(event: MatSelectChange) {
    this.stepperComunicationService.rodsCountChangedSubject.next(event.value);
    if (this.stepperComunicationService.order.length.length) {
      this.isSelected = true;
    }
  }

  refresh(productGroup: object, color: object) {
    this.loaderService.startLoader("Trwa wczytywanie danych...");
    this.restService.getRodLengthsByProductGroupIdAndColorId(productGroup['id'], color['id']).subscribe(value => {
      this.rodLengths = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  showErrorIfExists(){
    if (!(this.stepperComunicationService.order.length.length) || !(this.stepperComunicationService.order.rodCount)){
      this.snackBar.open("Wybierz długość karnisza i ilość drążków", null, {
        duration: 2 * 1000,
      });
    }
  }
}
