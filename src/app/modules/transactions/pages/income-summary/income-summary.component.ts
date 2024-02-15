import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionDetail } from '@models/transaction-detail.model';
import { IncomeService } from '@services/income.service';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-income-summary',
  standalone: true,
  imports: [CommonModule, TransactionLayoutComponent, TransactionDetailComponent],
  templateUrl: './income-summary.component.html',
  styleUrl: './income-summary.component.scss'
})
export class IncomeSummaryComponent {

  incomes$: TransactionDetail[] = [];

  constructor(
    private incomeService: IncomeService,

  ) {}

  ngOnInit() {
    this.incomeService.getIncomes().subscribe();
    this.incomeService.incomes$.subscribe(incomes => {
      this.incomes$ = incomes;
    });
  }

}
