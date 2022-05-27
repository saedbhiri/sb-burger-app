import { Router, ActivatedRoute } from '@angular/router';
import { Branch } from './../../shared/branch.model';
import { CustomerInfo } from './../../shared/customerInfo.model';
import { Menu } from './../../shared/menu.model';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  shoppingCart: Menu[];
  cartSubtotal: number;
  shippingPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  customerInfo: CustomerInfo;
  branch: Branch;
  receivingOrderWay: string;

  constructor(private shoppingCartService: ShoppingCartService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.cartSubtotal = this.shoppingCartService.getTotalPrice();
    this.shippingPrice = this.shoppingCartService.getDeliveryPrice();
    this.paymentMethod = this.shoppingCartService.getPaymentMethod();
    this.paymentStatus = this.statusOfPayment();
    this.customerInfo = this.shoppingCartService.getCustomerInfo();
    this.branch = this.shoppingCartService.getBranch();
    this.receivingOrderWay = this.shoppingCartService.getReceivingOrderWay();
    this.shoppingCartService.deleteShoppingCart();
  }

  calculateItemPrice(item: Menu) {
    return this.shoppingCartService.calculatePrice(item);
  }

  statusOfPayment(): string {
    let status = "";

    if (this.paymentMethod === "Cash")
      status = "Not Completed";
    if (this.paymentMethod === "Credit Card")
      status = "Completed";

    return status;
  }

  onBackToHome(): void {
    this.shoppingCartService.resetData();
    this.router.navigate(['/main'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.shoppingCartService.resetData();
  }
}
