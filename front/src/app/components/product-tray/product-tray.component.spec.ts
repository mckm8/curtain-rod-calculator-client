import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTrayComponent } from './product-tray.component';

describe('ProductTrayComponent', () => {
  let component: ProductTrayComponent;
  let fixture: ComponentFixture<ProductTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
