import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
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
    DatePipe
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {

  now = new Date();
  year = this.now.getFullYear();
  month = String(this.now.getMonth() + 1).padStart(2, '0');
  day = String(this.now.getDate()).padStart(2, '0');
  currentDate = `${this.year}-${this.month}-${this.day}`;
  
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
    private expenseService: ExpenseService,
    private router: Router,

  ) {
    console.log(this.currentDate);

  }

  createNewRegiste() {
    if (this.form.valid) {
      this.statusCreateRegister = 'loading';

      const { description, amount, sourceAccount, category, date } =
        this.form.getRawValue();
        
        let formattedDate: string | null = '';

        const dateNow = new Date();
        if (date === this.currentDate ) {
          formattedDate = new DatePipe('en-US').transform(
            dateNow,
            'yyyy-MM-ddTHH:mm:ss.SSS'
          );
        } else {
          formattedDate = new DatePipe('en-US').transform(
            date,
            'yyyy-MM-ddTHH:mm:ss.SSS'
          );
        }

      const expenseValue = parseFloat(amount);

      const expenseDto: ExpenseDto = {
        expense: expenseValue,
        description: description,
        expenseDate: formattedDate,
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
