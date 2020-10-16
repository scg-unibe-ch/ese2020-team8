import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMgmtDashboardComponent } from './product-mgmt-dashboard.component';

describe('ProductMgmtDashboardComponent', () => {
  let component: ProductMgmtDashboardComponent;
  let fixture: ComponentFixture<ProductMgmtDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMgmtDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMgmtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
