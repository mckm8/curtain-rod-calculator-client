import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingStep2Component } from './ending-step2.component';

describe('EndingStep2Component', () => {
  let component: EndingStep2Component;
  let fixture: ComponentFixture<EndingStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndingStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
