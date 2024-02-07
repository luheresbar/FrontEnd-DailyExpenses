import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent {

  faWallet = faWallet;

}
