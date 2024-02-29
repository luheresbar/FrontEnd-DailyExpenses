import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@services/user.service';
import { ExpenseCategoryService } from '@services/expense-category.service';
import { AccountService } from '@services/account.service';
import { IncomeCategoryService } from '@services/income-category.service';
import { ExpenseService } from '@services/expense.service';
import { IncomeService } from '@services/income.service';
import { CategoryDto } from '@models/category.model';
import { DateFilterService } from '@services/date-filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
})
export class LayoutMainComponent {

  enabledCategory: CategoryDto[] = [];
  currentDate$: string = "";
  nextDate$: string = "";
  currentDateChangeSubscription: Subscription | undefined;

  constructor(
    private dateFilterService: DateFilterService,
    private userService: UserService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService,
    private accountService: AccountService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
  ) {}
  
    ngOnInit() {
      this.userService.getProfile().subscribe();
      this.expenseCategoryService.getExpenseCategories().subscribe();
      this.incomeCategoryService.getIncomeCategories().subscribe();
      this.accountService.getAccounts().subscribe();

    }

    ngOnDestroy() {
      this.currentDateChangeSubscription?.unsubscribe();
    }

}
