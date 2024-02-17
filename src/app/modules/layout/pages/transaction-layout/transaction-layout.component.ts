import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
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
import { OverlayService } from '@services/overlay.service';
import { DialogNewRegisterComponent } from '@shared/components/dialog-new-register/dialog-new-register.component';
import { TransactionService } from '@services/transaction.service';
import { __values } from 'tslib';

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
    DialogNewRegisterComponent
  ],
  templateUrl: './transaction-layout.component.html',
  styleUrl: './transaction-layout.component.scss',
})
export class TransactionLayoutComponent {

  @Input() showTransactionFilter: boolean = true;
  @Input() showDateFilter: boolean = true;

  faPlus = faPlus;
  isOpenOverlayFloatingMenu$!: boolean;

  constructor(
    private overlayService: OverlayService,
  ) {}

  ngOnInit() {
    this.overlayService.isOpenOverlayFloatingMenu$.subscribe(value => {
      this.isOpenOverlayFloatingMenu$ = value;
    });
  }

  changeStateOverlayFloatingMenu() {
    this.overlayService.changeStateOverlayFloatingMenu();
  }
  

}
