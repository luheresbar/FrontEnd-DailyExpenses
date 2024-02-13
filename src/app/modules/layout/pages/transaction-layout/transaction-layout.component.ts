import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TransactionFilterComponent } from '../../components/transaction-filter/transaction-filter.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { AccountFilterComponent } from '../../components/account-filter/account-filter.component';
import { TransactionSummaryComponent } from '../../../transactions/pages/transaction-summary/transaction-summary.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FloatingButtonComponent } from '@shared/components/atoms/floating-button/floating-button.component';
import { FloatingMenuComponent } from '@shared/components/floating-menu/floating-menu.component';

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
    TransactionSummaryComponent,
    FontAwesomeModule,
    FloatingButtonComponent,
    OverlayModule,
    FloatingMenuComponent,
  ],
  templateUrl: './transaction-layout.component.html',
  styleUrl: './transaction-layout.component.scss',
})
export class TransactionLayoutComponent {
  faPlus = faPlus;
  isOpenOverlayFloatingMenu = false;

  constructor(
  ) {}

}
