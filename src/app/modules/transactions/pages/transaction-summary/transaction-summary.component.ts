import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [
    CommonModule, TransactionLayoutComponent, TransactionDetailComponent, SearchInputComponent
  ],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
