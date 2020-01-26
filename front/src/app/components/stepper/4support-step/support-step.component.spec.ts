import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportStepComponent } from './support-step.component';

describe('SupportStepComponent', () => {
  let component: SupportStepComponent;
  let fixture: ComponentFixture<SupportStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
