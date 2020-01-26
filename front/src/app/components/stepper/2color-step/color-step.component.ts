import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange, MatSnackBar} from "@angular/material";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {LoaderService} from "../../../services/loader-service.service";

@Component({
  selector: 'app-color-step',
  templateUrl: './color-step.component.html',
  styleUrls: ['./color-step.component.css']
})
export class ColorStepComponent implements OnInit {

  isSelected = false;
  colorsFormGroup: FormGroup;
  colors: any;

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.colorsFormGroup = this._formBuilder.group({
      colorsCtrl: ['', Validators.required]
    });
    this.stepperComunicationService.productGroupChangedSubject.subscribe(value => {
      this.refresh(value['id']);
    })
  }

  colorsChanged(event: MatSelectChange) {
    this.isSelected = true;
    this.stepperComunicationService.colorChangedSubject.next(event.value);
  }

  refresh(productGroupId: number) {
    this.loaderService.startLoader("Ładowanie grup kolorów...");
    this.restService.getColorsByProductGroupId(productGroupId).subscribe(value => {
      this.colors = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  showErrorIfExists(){
    if (!!!this.stepperComunicationService.order.color){
      this.snackBar.open("Wybierz kolor karnisza", null, {
        duration: 2 * 1000,
      });
    }
  }
}
