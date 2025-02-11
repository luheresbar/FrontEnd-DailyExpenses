import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { DateFilterComponent } from '../../../transactions/components/date-filter/date-filter.component';
import { TransactionFilterComponent } from '../../../transactions/components/transaction-filter/transaction-filter.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { AccountFilterComponent } from '../../../accounts/components/account-filter/account-filter.component';
import { TransactionSummaryComponent } from '../../../transactions/pages/transaction-summary/transaction-summary.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FloatingButtonComponent } from '@shared/components/atoms/floating-button/floating-button.component';
import { FloatingMenuComponent } from '@shared/components/floating-menu/floating-menu.component';
import { OverlayService } from '@services/overlay.service';
import { DialogTransactionComponent } from '../../../transactions/components/dialog-transaction/dialog-transaction.component';
import { BehaviorSubject } from 'rxjs';

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
    DialogTransactionComponent
  ],
  templateUrl: './transaction-layout.component.html',
  styleUrl: './transaction-layout.component.scss',
})
export class TransactionLayoutComponent {

  faPlus = faPlus;
  isOpenOverlayFloatingMenu$!: boolean;
  typeFloatingMenu: string = 'transactions';
  currentDate: string | null = null;
  nextDate: string | null = null;


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
  
  onCurrentDateChange(currentDate: string | null) {
    this.currentDate = currentDate;
  }

  onNextDateChange(nextDate: string | null) {
    this.nextDate = nextDate;
  }

}
