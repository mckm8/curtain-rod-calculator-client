import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {MatSelectChange, MatSnackBar} from "@angular/material";
import {LoaderService} from "../../../services/loader-service.service";

@Component({
  selector: 'app-ending-step',
  templateUrl: './ending-step.component.html',
  styleUrls: ['./ending-step.component.css']
})
export class EndingStepComponent implements OnInit {

  isSelected = false;
  endingsFormGroup: FormGroup;
  endings: any;
  endingsCountValue;
  endingsCountSliderValue;

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    console.log('EndingStepComponentngOnInit');
    this.endingsFormGroup = this._formBuilder.group({
      endingsCtrl: ['', Validators.required],
      endingsCountCtrl: [1, Validators.required],
      endingsCountSliderCtrl: 1
    });
    this.stepperComunicationService.colorChangedSubject.subscribe(value => {
      this.refresh(this.stepperComunicationService.order.productGroup, value);
    });

    this.endingsCountValue = this.endingsFormGroup.get('endingsCountCtrl');
    this.endingsCountSliderValue = this.endingsFormGroup.get('endingsCountSliderCtrl');

    this.endingsCountValue.valueChanges.subscribe(v => this.endingsCountSliderValue.setValue(v, { emitEvent: false }));
    this.endingsCountSliderValue.valueChanges.subscribe(v => this.endingsCountValue.setValue(v, { emitEvent: false }));
  }

  incrementCount(){
    this.endingsCountValue.setValue(this.endingsFormGroup.get('endingsCountCtrl').value + 1);
  }

  decrementCount(){
    this.endingsCountValue.setValue(this.endingsFormGroup.get('endingsCountCtrl').value - 1);
  }

  endingsChanged(event: MatSelectChange) {
    this.stepperComunicationService.endingChangedSubject.next(event.value);
    this.isSelected = true;
  }

  endingsCountChanged(value: any){
    this.stepperComunicationService.endingCountChangedSubject.next(value);
  }

  refresh(productGroup: object, color: object) {
    this.loaderService.startLoader("Trwa wczytywanie danych...");
    this.restService.getEndingsByProductGroupIdAndColorId(productGroup['id'], color['id']).subscribe(value => {
      this.endings = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  showErrorIfExists(){
    if (!!!this.stepperComunicationService.order.endingType){
      this.snackBar.open("Wybierz typ zakończeń karnisza", null, {
        duration: 2 * 1000,
      });
    }
  }
}
