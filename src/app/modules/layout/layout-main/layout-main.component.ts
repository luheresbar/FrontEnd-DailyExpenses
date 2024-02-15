import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@services/user.service';
import { ExpenseCategoryService } from '@services/expense-category.service';
import { AccountService } from '@services/account.service';
import { IncomeCategoryService } from '@services/income-category.service';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
})
export class LayoutMainComponent {


  constructor(
    private userService: UserService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService,
    private accountService: AccountService,
  ) {}
  
    ngOnInit() {
      this.userService.getProfile().subscribe();
      this.expenseCategoryService.getExpenseCategories().subscribe();
      this.incomeCategoryService.getExpenseCategories().subscribe();
      this.accountService.getAccounts().subscribe();
    }

}
