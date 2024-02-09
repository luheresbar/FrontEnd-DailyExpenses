import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [],
  templateUrl: './transaction-filter.component.html',
  styleUrl: './transaction-filter.component.scss',
})
export class TransactionFilterComponent {
  
  activeButton: string = 'all';

  constructor() {}

  setActiveButton(button: string) {
    this.activeButton = button;
  }
}
