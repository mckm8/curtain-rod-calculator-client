import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../services/rest.service";
import {map} from "rxjs/operators";
import {MatRadioChange, MatSelectChange, MatSnackBar} from "@angular/material";
import {StepperComunicationService} from "../../../services/stepper-comunication.service";
import {IMAGES_PATH} from "../../../configuration/paths";
import {LoaderService} from "../../../services/loader-service.service";

@Component({
  selector: 'app-product-group-step',
  templateUrl: './product-group-step.component.html',
  styleUrls: ['./product-group-step.component.scss']
})
export class ProductGroupStepComponent implements OnInit {

  isSelected = false;
  productGroupFormGroup: FormGroup;
  productGroups: any[];

  constructor(private _formBuilder: FormBuilder,
              private restService: RestService,
              private stepperComunicationService: StepperComunicationService,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.productGroupFormGroup = this._formBuilder.group({
      productGroupCtrl: ['', Validators.required]
    });

    this.loaderService.startLoader("Ładowanie grup produktów...");
    this.restService.getAllProductGroups().pipe(map((response: any) => {
      return response._embedded.productGroupDefs;
    })).subscribe(value => {
      this.productGroups = value;
      this.loaderService.stopLoader();
    }, error1 => {
      this.loaderService.stopLoader();
      this.snackBar.open("WYSTĄPIŁ BŁĄD !!!");
    })
  }

  productGroupChanged(event: MatRadioChange) {
    this.isSelected = true;
    this.stepperComunicationService.productGroupChangedSubject.next(event.value);
  }

  showErrorIfExists() {
    //todo moze uzyc isSelected?
    if (!!!this.stepperComunicationService.order.productGroup) {
      this.snackBar.open("Wybierz typ karnisza", null, {
        duration: 2 * 1000,
      });
    }
  }

  createImageLink(filename: string) {
    return IMAGES_PATH + filename;
  }

  rodLengthChanged(event: object) {
    this.stepperComunicationService.rodLengthChangedSubject.next(event);
  }

  rodCountChanged(event: MatSelectChange) {
    this.stepperComunicationService.rodsCountChangedSubject.next(event.value);
  }
}
