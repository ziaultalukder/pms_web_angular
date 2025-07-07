import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRefundComponent } from './stock-refund.component';

describe('StockRefundComponent', () => {
  let component: StockRefundComponent;
  let fixture: ComponentFixture<StockRefundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockRefundComponent]
    });
    fixture = TestBed.createComponent(StockRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
