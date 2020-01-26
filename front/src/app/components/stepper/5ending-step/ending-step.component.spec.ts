import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingStepComponent } from './ending-step.component';

describe('EndingStepComponent', () => {
  let component: EndingStepComponent;
  let fixture: ComponentFixture<EndingStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndingStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
