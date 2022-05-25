import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartPaymentComponent } from './shopping-cart-payment.component';

describe('ShoppingCartPaymentComponent', () => {
  let component: ShoppingCartPaymentComponent;
  let fixture: ComponentFixture<ShoppingCartPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
