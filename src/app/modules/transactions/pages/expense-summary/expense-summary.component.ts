import { Component } from '@angular/core';
import { TransactionDetail } from '@models/transaction-detail.model';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '@services/expense.service';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule, TransactionDetailComponent, TransactionLayoutComponent],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.scss'
})
export class ExpenseSummaryComponent {

  expenses: TransactionDetail[] = [];

  constructor(
    private expenseService: ExpenseService,

  ) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses.expenses;
    });
  }

}
