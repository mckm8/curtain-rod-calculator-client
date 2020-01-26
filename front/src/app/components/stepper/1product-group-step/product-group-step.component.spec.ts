import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupStepComponent } from './product-group-step.component';

describe('ProductGroupStepComponent', () => {
  let component: ProductGroupStepComponent;
  let fixture: ComponentFixture<ProductGroupStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
