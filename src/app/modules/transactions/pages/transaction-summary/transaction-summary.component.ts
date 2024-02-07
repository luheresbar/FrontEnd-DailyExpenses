import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthContainerComponent } from '../../../auth/components/auth-container/auth-container.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, TransactionDetailComponent],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
