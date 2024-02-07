import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthContainerComponent } from '../../../auth/components/auth-container/auth-container.component';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
import { TransactionFilterComponent } from '../../../layout/components/transaction-filter/transaction-filter.component';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, NavbarComponent, TransactionFilterComponent],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
