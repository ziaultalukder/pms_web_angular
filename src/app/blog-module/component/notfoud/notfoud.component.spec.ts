import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoudComponent } from './notfoud.component';

describe('NotfoudComponent', () => {
  let component: NotfoudComponent;
  let fixture: ComponentFixture<NotfoudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotfoudComponent]
    });
    fixture = TestBed.createComponent(NotfoudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
