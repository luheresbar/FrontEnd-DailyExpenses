import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { TransactionDetail } from '@models/transaction-detail.model';
import { IncomeService } from '@services/income.service';
import { Subscription } from 'rxjs';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { DateFilterService } from '@services/date-filter.service';
import { ExpenseService } from '@services/expense.service';

@Component({
  selector: 'app-income-summary',
  standalone: true,
  imports: [CommonModule, TransactionLayoutComponent, TransactionDetailComponent],
  templateUrl: './income-summary.component.html',
  styleUrl: './income-summary.component.scss'
})
export class IncomeSummaryComponent implements OnDestroy {

  incomes$: TransactionDetail[] = [];
  currentDate$: string = "";
  nextDate$: string = "";
  currentDateChangeSubscription$: Subscription | undefined;

  constructor(
    private incomeService: IncomeService,
    private dateFilterService: DateFilterService,
    private expenseService: ExpenseService,

  ) {}

  ngOnInit() {
 
    this.dateFilterService.currentDateFormatted$.subscribe(date => {
      this.currentDate$ = date;
    });
    
    this.dateFilterService.nextDateFormatted$.subscribe(date => {
      this.nextDate$ = date;
    });

    this.incomeService.incomes$.subscribe(incomes => {
      this.incomes$ = incomes;
    })
    
    this.currentDateChangeSubscription$ = this.dateFilterService.currentDateChanged$.subscribe(() => {
      this.incomes$ = [];
      this.updateIncomes();
    });
  }

  ngOnDestroy() {
    this.currentDateChangeSubscription$?.unsubscribe();
  }

  updateIncomes() {
    this.incomeService.getIncomes(this.currentDate$, this.nextDate$).subscribe();
    this.expenseService.getMonthlyExpenseTotal(this.currentDate$, this.nextDate$).subscribe();
  }
}