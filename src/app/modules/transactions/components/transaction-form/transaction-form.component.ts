import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RequestStatus } from '@models/request-status.model';
import { ExpenseDto } from '@models/transaction-detail.model';
import { ExpenseService } from '@services/expense.service';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    BtnComponent,
    // DatePipe
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  currentDate = new Date().toISOString();
  statusCreateRegister: RequestStatus = 'init';

  form = this.formBuilder.nonNullable.group({
    type: [''],
    amount: ['222', [Validators.required]],
    sourceAccount: ['Cash'],
    destinationAccount: [''],
    category: ['Others'],
    description: ['Prueba'],
    date: [this.currentDate],
  });

  showRegister = false;
  showPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    // private accountService: AccountService,
    // private categoryServices: CategoryService,
    private expenseService: ExpenseService,
    private router: Router,
    // private datePipe: DatePipe,

  ) {}

  createNewRegiste() {
    if (this.form.valid) {
      this.statusCreateRegister = 'loading';

      const { description, amount, sourceAccount, category, date } =
        this.form.getRawValue();

        // const formattedDate = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSSSSS');

      const expenseValue = parseFloat(amount);

      const expenseDto: ExpenseDto = {
        expense: expenseValue,
        description: description,
        expenseDate: date,
        accountName: sourceAccount,
        categoryName: category,
      };

      this.expenseService.createExpense(expenseDto).subscribe({
        next: () => {
          this.statusCreateRegister = 'success';
          // this.newExpenseDialog.close();
          // this.expensesComponent.
          this.router.navigate(['/expenses']);
        },
        error: (error) => {
          this.statusCreateRegister = 'failed';
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
