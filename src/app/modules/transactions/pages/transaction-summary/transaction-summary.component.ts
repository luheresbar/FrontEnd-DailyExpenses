import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { TransactionService } from '@services/transaction.service';
import { TransactionDetail } from '@models/transaction-detail.model';
import { DateFilterService } from '@services/date-filter.service';
import { Subscription } from 'rxjs';
import { IncomeService } from '@services/income.service';
import { ExpenseService } from '@services/expense.service';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [
    CommonModule,
    TransactionLayoutComponent,
    TransactionDetailComponent,
    SearchInputComponent,
  ],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss',
})
export class TransactionSummaryComponent implements OnDestroy {
  transactions$: TransactionDetail[] = [];
  currentDate$: string = '';
  nextDate$: string = '';
  currentDateChangeSubscription$: Subscription | undefined;

  totalExpense$: number | null = 0.0;
  totalIncome$: number | null = 0.0;

  constructor(
    private transactionService: TransactionService,
    private dateFilterService: DateFilterService,
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.dateFilterService.currentDateFormatted$.subscribe((date) => {
      this.currentDate$ = date;
    });

    this.dateFilterService.nextDateFormatted$.subscribe((date) => {
      this.nextDate$ = date;
    });

    this.currentDateChangeSubscription$ =
      this.dateFilterService.currentDateChanged$.subscribe(() => {
        this.updateTransactions();
      });

    this.transactionService.totalIncomes$.subscribe((value) => {
      this.totalIncome$ = value;
      this.incomeService.totalIncomes$.next(this.totalIncome$);
    });

    this.transactionService.totalExpenses$.subscribe((value) => {
      this.totalExpense$ = value;
      this.expenseService.totalExpenses$.next(this.totalExpense$);
    });
  }

  ngOnDestroy() {
    this.currentDateChangeSubscription$?.unsubscribe();
  }

  updateTransactions() {
    this.transactionService
      .getAll(this.currentDate$, this.nextDate$)
      .subscribe((transactions) => {
        this.transactions$ = transactions.transactionDetails;
      });
  }
}
