import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalButtonsComponent } from './approval-buttons.component';

describe('ApprovalButtonsComponent', () => {
  let component: ApprovalButtonsComponent;
  let fixture: ComponentFixture<ApprovalButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
