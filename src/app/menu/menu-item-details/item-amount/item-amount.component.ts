import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-amount',
  templateUrl: './item-amount.component.html',
  styleUrls: ['./item-amount.component.css']
})
export class ItemAmountComponent implements OnInit {

  @Input() amount: number;
  @Input() form: FormGroup;
  @Output() amountChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onMinusClick() {
    if (this.amount > 1)
      this.amount--;
    this.amountChanged.next(this.amount);
  }

  onPlusClick() {
    this.amount++;
    this.amountChanged.next(this.amount);
  }

}
