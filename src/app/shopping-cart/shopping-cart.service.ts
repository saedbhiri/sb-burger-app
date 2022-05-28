import { Branch } from './../shared/branch.model';
import { CreditCard } from './../shared/creditCard.model';
import { CustomerInfo } from './../shared/customerInfo.model';
import { Menu } from './../shared/menu.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  private shoppingCart: Menu[] = [];
  shoppingCartChanged = new Subject<Menu[]>();
  private totalPrice: number = 0;
  private deliveryPrice: number = 0;
  private branch: Branch;
  private receivingOrderWay: string;
  private paymentMethod: string;
  private customerInfo: CustomerInfo;
  private creditCard: CreditCard;

  getShoppingCart() {
    return this.shoppingCart.slice();
  }

  addToShoppingCart(item: Menu) {
    const index = this.checkIfExist(this.shoppingCart, item);
    if (index != -1) {
      this.shoppingCart[index].amount += item.amount;
    }
    else
      this.shoppingCart.push(item);
    this.shoppingCartChanged.next(this.shoppingCart.slice());
  }

  checkIfExist(shoppingCart: Menu[], item: Menu) {
    return this.shoppingCart.findIndex(element => {
      if (element.category === item.category && element.name === item.name && element.note === item.note) {
        if (this.objectAreSame(element.ingredients, item.ingredients) && this.objectAreSame(element.sauces, item.sauces)
          && this.objectAreSame(element.sideDishes, item.sideDishes) && this.objectAreSame(element.weight, item.weight))
          return true;
        else return false;
      }
      else
        return false;
    });
  }

  objectAreSame(x, y) {
    var objectAreSame = true;
    for (var i = 0; i < x.length; i++) {
      for (var propertyName in x[i]) {
        if (x[i][propertyName] != y[i][propertyName]) {
          objectAreSame = false;
          break;
        }
      }
    }
    return objectAreSame;
  }

  deleteFromShoppingCart(index: number) {
    this.shoppingCart.splice(index, 1);
    this.shoppingCartChanged.next(this.shoppingCart.slice());
  }

  deleteShoppingCart() {
    this.shoppingCart = [];
    this.shoppingCartChanged.next(this.shoppingCart.slice());
  }

  updateShoppingCart(index: number, newItem: Menu) {
    const ind = this.checkIfExist(this.shoppingCart, newItem);
    if (ind != -1) {
      if (index != ind) {
        this.shoppingCart[ind].amount += newItem.amount;
        this.shoppingCart.splice(index, 1);
      }
      else
        this.shoppingCart[index] = newItem;
    }
    else
      this.shoppingCart[index] = newItem;
    this.shoppingCartChanged.next(this.shoppingCart.slice());
  }

  getShoppingCartLength() {
    return this.shoppingCart.length;
  }

  getShoppingCartByIndex(index: number) {
    return this.shoppingCart[index];
  }

  getShoppingCartByName(name: string) {
    return this.shoppingCart.find(element => element.name === name);
  }

  calculatePrice(item: Menu): number {
    let sum = item.price;
    item.weight.forEach(weight => {
      sum += (weight.quantity - 1) * weight.price;
    })

    item.sideDishes.forEach(sideDish => {
      if (sideDish.sideValue)
        sum += sideDish.sidePrice;
    })

    return sum *= item.amount;
  }

  calculateTotalPrice(shoppingCart: Menu[]): number {
    let sum = 0;
    shoppingCart.forEach(item => {
      sum += this.calculatePrice(item);
    })
    return sum;
  }

  getSideDishe(item: Menu): string[] {
    let sideDishNames = [];
    item.sideDishes.forEach(sideDish => {
      if (sideDish.sideValue)
        sideDishNames.push("+" + sideDish.sideName);
    })
    return sideDishNames;
  }

  getIngredients(item: Menu): string[] {
    let ingredientsNames = [];
    item.ingredients.forEach(ingredient => {
      if (!ingredient.ingredientValue)
        ingredientsNames.push("-" + ingredient.ingredientName);
    })
    return ingredientsNames;
  }

  getSauces(item: Menu): string[] {
    let saucesNames = [];
    item.sauces.forEach(sauce => {
      if (sauce.sauceName != "skb") {
        if (sauce.sauceValue)
          saucesNames.push("+" + sauce.sauceName);
      }
      else {
        if (!sauce.sauceValue) {
          saucesNames.push("-" + sauce.sauceName)
        }
      }
    })
    return saucesNames;
  }

  storeBranch(branch: Branch) {
    this.branch = branch;
  }

  getBranch() {
    return this.branch;
  }

  storeReceivingOrderWay(order: string) {
    this.receivingOrderWay = order;
  }

  getReceivingOrderWay() {
    return this.receivingOrderWay;
  }

  storePaymentMethod(payment: string) {
    this.paymentMethod = payment;
  }

  getPaymentMethod() {
    return this.paymentMethod;
  }

  storeTotalPrice(total: number) {
    this.totalPrice = total;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  addCustomerInfo(custInfo: CustomerInfo) {
    this.customerInfo = custInfo;
    this.deliveryPrice = 30;
  }

  getCustomerInfo() {
    return this.customerInfo;
  }

  getDeliveryPrice() {
    return this.deliveryPrice;
  }

  setDeliveryPriceToZero() {
    this.deliveryPrice = 0;
  }

  addCreditCard(creditCard: CreditCard) {
    this.creditCard = creditCard;
  }

  getCreditCard() {
    return this.creditCard;
  }

  resetData() {
    this.totalPrice = 0;
    this.deliveryPrice = 0;
    this.branch = null;
    this.receivingOrderWay = "";
    this.paymentMethod = "";
    this.customerInfo = null;
    this.creditCard = null;
  }

}
