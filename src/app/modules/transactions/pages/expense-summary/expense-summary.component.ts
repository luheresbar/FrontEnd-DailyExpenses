import { Component } from '@angular/core';
import { TransactionDetail } from '@models/transaction-detail.model';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '@services/expense.service';
import { DateFilterService } from '@services/date-filter.service';
import { Subscription } from 'rxjs';
import { IncomeService } from '@services/income.service';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule, TransactionDetailComponent, TransactionLayoutComponent],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.scss'
})
export class ExpenseSummaryComponent {

  expenses$: TransactionDetail[] = [];
  currentDate$: string = "";
  nextDate$: string = "";
  currentDateChangeSubscription$: Subscription | undefined;


  constructor(
    private expenseService: ExpenseService,
    private dateFilterService: DateFilterService,
    private incomeService: IncomeService,

  ) {}

  ngOnInit() {
    
    this.dateFilterService.currentDateFormatted$.subscribe(date => {
      this.currentDate$ = date;
    });
    
    this.dateFilterService.nextDateFormatted$.subscribe(date => {
      this.nextDate$ = date;
    });
    
    this.currentDateChangeSubscription$ = this.dateFilterService.currentDateChanged$.subscribe(() => {
      this.updateExpenses();
    });
  }

  ngOnDestroy() {
    this.currentDateChangeSubscription$?.unsubscribe();
  }

  updateExpenses() {
    this.expenseService.getExpenses(this.currentDate$, this.nextDate$).subscribe(expenses => {
      this.expenses$ = expenses.transactionDetails;
    });
    this.incomeService.getMonthlyIncomeTotal(this.currentDate$, this.nextDate$).subscribe();
  }
}
