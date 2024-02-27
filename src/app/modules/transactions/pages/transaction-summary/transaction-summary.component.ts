import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { TransactionService } from '@services/transaction.service';
import { TransactionDetail } from '@models/transaction-detail.model';
import { DateFilterService } from '@services/date-filter.service';

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
  currentDate$: string = "";
  nextDate$: string = "";

  constructor(
    private transactionService: TransactionService,
    private dateFilterService: DateFilterService,

  ) {}
  
  ngOnInit() {
    this.dateFilterService. currentDateFormatted$.subscribe(date => {
      this.currentDate$ = date;
    })
    this.dateFilterService.nextDateFormatted$.subscribe(date => {
      this.nextDate$ = date;
    })

    this.transactionService.getAll(this.currentDate$, this.nextDate$).subscribe();
    
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions$ = transactions;
    });

    console.log(this.currentDate$);
    console.log(this.nextDate$);
    
    
  }





}
