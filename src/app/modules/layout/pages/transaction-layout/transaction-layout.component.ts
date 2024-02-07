import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TransactionFilterComponent } from '../../components/transaction-filter/transaction-filter.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-transaction-layout',
  standalone: true,
  imports: [CommonModule, HeaderbarComponent, DateFilterComponent, TransactionFilterComponent, NavbarComponent],
  templateUrl: './transaction-layout.component.html',
  styleUrl: './transaction-layout.component.scss'
})
export class TransactionLayoutComponent {

}
