import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TransactionFilterComponent } from '../../components/transaction-filter/transaction-filter.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { AccountFilterComponent } from '../../components/account-filter/account-filter.component';
import { TransactionSummaryComponent } from '../../../transactions/pages/transaction-summary/transaction-summary.component';

@Component({
  selector: 'app-transaction-layout',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderbarComponent, 
    DateFilterComponent, 
    TransactionFilterComponent, 
    NavbarComponent, 
    SearchInputComponent, 
    AccountFilterComponent,
    TransactionSummaryComponent
  ],
  templateUrl: './transaction-layout.component.html',
  styleUrl: './transaction-layout.component.scss'
})
export class TransactionLayoutComponent {

  // showAditionalContent: boolean = true;

  constructor() {}

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   this.showAditionalContent = (event.target as Window).innerWidth > 768;
  // }

}
