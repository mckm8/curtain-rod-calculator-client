import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodLengthStepComponent } from './rod-length-step.component';

describe('RodLengthStepComponent', () => {
  let component: RodLengthStepComponent;
  let fixture: ComponentFixture<RodLengthStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodLengthStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodLengthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
