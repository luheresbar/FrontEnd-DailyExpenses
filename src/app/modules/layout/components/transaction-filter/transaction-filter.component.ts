import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ExpenseService } from '@services/expense.service';
import { IncomeService } from '@services/income.service';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref, 
    RouterLinkActive
  ],
  templateUrl: './transaction-filter.component.html',
  styleUrl: './transaction-filter.component.scss',
})
export class TransactionFilterComponent {
  
  totalExpenses$!: number | null;
  totalIncomes$!: number | null;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit() {
    
    this.expenseService.totalExpenses$.subscribe(value => {
      this.totalExpenses$ = value;
    })
    this.incomeService.totalIncomes$.subscribe(value => {
      this.totalIncomes$ = value;
    })
  }

}
