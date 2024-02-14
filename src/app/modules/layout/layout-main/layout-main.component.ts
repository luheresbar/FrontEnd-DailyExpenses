import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@services/user.service';
import { ExpenseCategoryService } from '@services/expenseCategory.service';
import { AccountService } from '@services/account.service';

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
    private expenseCategory: ExpenseCategoryService,
    private accountService: AccountService,
  ) {}
  
    ngOnInit() {
      this.userService.getProfile().subscribe();
      this.expenseCategory.getExpenseCategories().subscribe();
      this.accountService.getAccounts().subscribe();
    }

}
