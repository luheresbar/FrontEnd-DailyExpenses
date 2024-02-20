import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Account } from '@models/account.model';
import { AccountService } from '@services/account.service';
import { CategoryLayoutComponent } from '../../../layout/pages/category-layout/category-layout.component';
import { CategoryDetailComponent } from '../../components/category-detail/category-detail.component';

@Component({
  selector: 'app-category-summary',
  standalone: true,
  imports: [
    CommonModule,
    CategoryLayoutComponent,
    CategoryDetailComponent
  ],
  templateUrl: './category-summary.component.html',
  styleUrl: './category-summary.component.scss'
})
export class CategorySummaryComponent {
  
  showTransactionFilter: boolean = false;
  showDateFilter: boolean = false;
  showTotalBalance: boolean = true;


  enabledAccounts$: Account[] = [];
  disabledAccounts$: Account[] = [];

  constructor(
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.accountService.enabledAccounts$.subscribe( accounts => {
      this.enabledAccounts$ = accounts;
    });
    this.accountService.disabledAccounts$.subscribe( accounts => {
      this.disabledAccounts$ = accounts;
    });
  }


}
