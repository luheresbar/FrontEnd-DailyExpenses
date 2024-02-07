import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthContainerComponent } from '../../../auth/components/auth-container/auth-container.component';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
import { TransactionFilterComponent } from '../../../layout/components/transaction-filter/transaction-filter.component';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { DateFilterComponent } from '../../../layout/components/date-filter/date-filter.component';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, NavbarComponent, TransactionFilterComponent, TransactionDetailComponent, DateFilterComponent],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
