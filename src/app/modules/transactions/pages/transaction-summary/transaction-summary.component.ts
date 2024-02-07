import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthContainerComponent } from '../../../auth/components/auth-container/auth-container.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, TransactionComponent],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
