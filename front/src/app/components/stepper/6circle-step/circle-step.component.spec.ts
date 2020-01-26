import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleStepComponent } from './circle-step.component';

describe('CircleStepComponent', () => {
  let component: CircleStepComponent;
  let fixture: ComponentFixture<CircleStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
