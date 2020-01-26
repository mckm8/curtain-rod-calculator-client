import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {MatSelectChange, MatSnackBar} from "@angular/material";
import {LoaderService} from "../../../services/loader-service.service";

@Component({
  selector: 'app-circle-step',
  templateUrl: './circle-step.component.html',
  styleUrls: ['./circle-step.component.css']
})
export class CircleStepComponent implements OnInit {

  isSelected = false;
  circlesFormGroup: FormGroup;
  circles: any;

  circlesCountValue;
  circlesCountSliderValue;

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.circlesFormGroup = this._formBuilder.group({
      circlesCtrl: ['', Validators.required],
      circlesCountCtrl: [1, Validators.required],
      circlesCountSliderCtrl: 1
    });

    this.stepperComunicationService.colorChangedSubject.subscribe(value => {
      this.refresh(this.stepperComunicationService.order.productGroup, value);
    });

    this.circlesCountValue = this.circlesFormGroup.get('circlesCountCtrl');
    this.circlesCountSliderValue = this.circlesFormGroup.get('circlesCountSliderCtrl');

    this.circlesCountValue.valueChanges.subscribe(v => this.circlesCountSliderValue.setValue(v, { emitEvent: false }));
    this.circlesCountSliderValue.valueChanges.subscribe(v => this.circlesCountValue.setValue(v, { emitEvent: false }));
  }

  incrementCount(){
    this.circlesCountValue.setValue(this.circlesFormGroup.get('circlesCountCtrl').value + 1);
  }

  decrementCount(){
    this.circlesCountValue.setValue(this.circlesFormGroup.get('circlesCountCtrl').value - 1);
  }

  circlesChanged(event: MatSelectChange) {
    this.stepperComunicationService.circleChangedSubject.next(event.value);
    this.isSelected = true;
  }

  circlesCountChanged(value: any){
    this.stepperComunicationService.circleCountChangedSubject.next(value);
  }

  refresh(productGroup: object, color: object) {
    this.loaderService.startLoader("Trwa wczytywanie danych...");
    this.restService.getCirclesByProductGroupIdAndColorId(productGroup['id'], color['id']).subscribe(value => {
      this.circles = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  showErrorIfExists(){
    if (!!!this.stepperComunicationService.order.circleType){
      this.snackBar.open("Wybierz typ haczyków dla karnisza", null, {
        duration: 2 * 1000,
      });
    }
  }

}
