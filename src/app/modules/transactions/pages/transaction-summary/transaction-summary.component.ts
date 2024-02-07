import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [
    CommonModule, TransactionLayoutComponent, TransactionDetailComponent
  ],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
