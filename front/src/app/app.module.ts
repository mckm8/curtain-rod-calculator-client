import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StepperComponent} from './components/stepper/stepper.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material/material.module";
import {ProductGroupStepComponent} from './components/stepper/1product-group-step/product-group-step.component';
import {ColorStepComponent} from './components/stepper/2color-step/color-step.component';
import {SupportStepComponent} from './components/stepper/4support-step/support-step.component';
import {EndingStepComponent} from './components/stepper/5ending-step/ending-step.component';
import {CircleStepComponent} from './components/stepper/6circle-step/circle-step.component';
import {RodLengthStepComponent} from './components/stepper/3rod-length-step/rod-length-step.component';
import {ProductTrayComponent} from './components/product-tray/product-tray.component';
import {GestureConfig, MatSidenavModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminComponent} from './components/admin/admin.component';
import {MainComponent} from './components/main/main.component';
import {SummaryComponent} from './components/stepper/7summary/summary.component';
import {OrderCompletedComponent} from './components/stepper/7summary/order-completed/order-completed.component';
import { OrderPreviewComponent } from './components/stepper/7summary/order-preview/order-preview.component';
import { ImagePreviewComponent } from './components/product-tray/image-preview/image-preview.component';
import { EndingStep2Component } from './components/stepper/ending-step2/ending-step2.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    ProductGroupStepComponent,
    ColorStepComponent,
    SupportStepComponent,
    EndingStepComponent,
    CircleStepComponent,
    RodLengthStepComponent,
    ProductTrayComponent,
    AdminComponent,
    MainComponent,
    SummaryComponent,
    OrderCompletedComponent,
    OrderPreviewComponent,
    ImagePreviewComponent,
    EndingStep2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    OrderCompletedComponent,
    ImagePreviewComponent
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
