import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionManagerComponent } from './product-description-manager.component';

describe('ProductCreateComponent', () => {
  let component: ProductDescriptionManagerComponent;
  let fixture: ComponentFixture<ProductDescriptionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDescriptionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDescriptionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
