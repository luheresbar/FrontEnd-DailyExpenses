import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { TransactionDetail } from '@models/transaction-detail.model';
import { Subscription } from 'rxjs';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { TransferService } from '@services/transfer.service';
import { DateFilterService } from '@services/date-filter.service';
import { ExpenseService } from '@services/expense.service';
import { IncomeService } from '@services/income.service';

@Component({
  selector: 'app-transfer-summary',
  standalone: true,
  imports: [
    CommonModule,
    TransactionLayoutComponent,
    TransactionDetailComponent,
  ],
  templateUrl: './transfer-summary.component.html',
  styleUrl: './transfer-summary.component.scss',
})
export class TransferSummaryComponent implements OnDestroy {
  transfers$: TransactionDetail[] = [];
  currentDate$: string = '';
  nextDate$: string = '';
  currentDateChangeSubscription$: Subscription | undefined;

  constructor(
    private transferService: TransferService,
    private dateFilterService: DateFilterService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService
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
        this.updateTransfer();
      });
  }

  ngOnDestroy() {
    this.currentDateChangeSubscription$?.unsubscribe();
  }

  updateTransfer() {
    this.transferService
      .getTransfers(this.currentDate$, this.nextDate$)
      .subscribe((transfers) => {
        this.transfers$ = transfers.transactionDetails;
      });
    this.expenseService.getMonthlyExpenseTotal(this.currentDate$, this.nextDate$)
      .subscribe();
    this.incomeService.getMonthlyIncomeTotal(this.currentDate$, this.nextDate$)
      .subscribe();
  }
}
