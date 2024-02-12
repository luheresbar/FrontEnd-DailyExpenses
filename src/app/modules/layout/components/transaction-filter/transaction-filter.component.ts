import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [RouterLinkWithHref],
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
