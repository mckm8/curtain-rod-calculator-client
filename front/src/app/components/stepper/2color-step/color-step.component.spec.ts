import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorStepComponent } from './color-step.component';

describe('ColorStepComponent', () => {
  let component: ColorStepComponent;
  let fixture: ComponentFixture<ColorStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
