import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { TransactionService } from '@services/transaction.service';
import { TransactionDetail } from '@models/transaction-detail.model';

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

  transactions$: TransactionDetail[] = [];

  constructor(
    private transactionService: TransactionService,
  ) {}
  
  ngOnInit() {
    this.transactionService.getAll().subscribe();
    
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions$ = transactions;
    });
  }

}
