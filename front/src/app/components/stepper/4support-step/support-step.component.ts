import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {MatSelectChange, MatSnackBar} from "@angular/material";
import {LoaderService} from "../../../services/loader-service.service";

@Component({
  selector: 'app-support-step',
  templateUrl: './support-step.component.html',
  styleUrls: ['./support-step.component.css']
})
export class SupportStepComponent implements OnInit {
  isSelected = false;
  supportsFormGroup: FormGroup;
  supports: any;

  supportsCountValue;
  supportsCountSliderValue;

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }


  ngOnInit() {
    this.supportsFormGroup = this._formBuilder.group({
      supportsCtrl: ['', Validators.required],
      supportsCountCtrl: [1, Validators.required],
      supportsCountSliderCtrl: 1
    });


    this.stepperComunicationService.colorChangedSubject.subscribe(value => {
      this.refresh(this.stepperComunicationService.order.productGroup, value);
    });
    this.supportsCountValue = this.supportsFormGroup.get('supportsCountCtrl');
    this.supportsCountSliderValue = this.supportsFormGroup.get('supportsCountSliderCtrl');

    this.supportsCountValue.valueChanges.subscribe(v => this.supportsCountSliderValue.setValue(v, { emitEvent: false }));
    this.supportsCountSliderValue.valueChanges.subscribe(v => this.supportsCountValue.setValue(v, { emitEvent: false }));
  }

  incrementCount(){
    this.supportsCountValue.setValue(this.supportsFormGroup.get('supportsCountCtrl').value + 1);
  }

  decrementCount(){
    this.supportsCountValue.setValue(this.supportsFormGroup.get('supportsCountCtrl').value - 1);
  }

  supportsChanged(event: MatSelectChange) {
    this.stepperComunicationService.supportChangedSubject.next(event.value);
    this.isSelected = true;
  }

  supportsCountChanged(value: any){
    this.stepperComunicationService.supportCountChangedSubject.next(value);
  }

  refresh(productGroup: object, color: object) {
    this.loaderService.startLoader("Trwa wczytywanie danych...");
    this.restService.getsupportsByProductGroupIdAndColorId(productGroup['id'], color['id']).subscribe(value => {
      this.supports = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  showErrorIfExists(){
    if (!!!this.stepperComunicationService.order.supportType){
      this.snackBar.open("Wybierz typ wsporników dla karnisza", null, {
        duration: 2 * 1000,
      });
    }
  }
}
