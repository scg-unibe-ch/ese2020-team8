import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditImagesComponent } from './product-edit-images.component';

describe('ProductEditImagesComponent', () => {
  let component: ProductEditImagesComponent;
  let fixture: ComponentFixture<ProductEditImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
