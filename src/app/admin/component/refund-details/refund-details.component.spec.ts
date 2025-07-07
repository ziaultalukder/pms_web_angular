import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundDetailsComponent } from './refund-details.component';

describe('RefundDetailsComponent', () => {
  let component: RefundDetailsComponent;
  let fixture: ComponentFixture<RefundDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefundDetailsComponent]
    });
    fixture = TestBed.createComponent(RefundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
