import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoaderService} from "../../../services/loader-service.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-ending-step2',
  templateUrl: './ending-step2.component.html',
  styleUrls: ['./ending-step2.component.scss']
})
export class EndingStep2Component implements OnInit {

  isSelected = false;
  endings2FormGroup: FormGroup;
  endings: any;

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    console.log('EndingStep2ComponentngOnInit');
    this.endings2FormGroup = this._formBuilder.group({
      endings2Ctrl: ['', Validators.required],
      endingsCountCtrl: [1, Validators.required],
      endingsCountSliderCtrl: 1
    });
    this.refresh(this.stepperComunicationService.order.productGroup,
      this.stepperComunicationService.order.color);
  }

  endingsChanged(event: MatSelectChange) {
    this.stepperComunicationService.ending2ChangedSubject.next(event.value);
    this.isSelected = true;
  }

  refresh(productGroup: object, color: object) {
    this.loaderService.startLoader("Trwa wczytywanie danych...");
    this.restService.getEndingSecondRodsByProductGroupIdAndColorId(productGroup['id'], color['id']).subscribe(value => {
      this.endings = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  showErrorIfExists(){
    if (!!!this.stepperComunicationService.order.ending2Type){
      this.snackBar.open("Wybierz typ zakończeń karnisza dla drugiego drążka", null, {
        duration: 2 * 1000,
      });
    }
  }
}
