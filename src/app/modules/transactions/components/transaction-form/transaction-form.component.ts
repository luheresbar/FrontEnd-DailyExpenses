import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RequestStatus } from '@models/request-status.model';
import { TransactionDetail, stateTransaction } from '@models/transaction-detail.model';
import { ExpenseService } from '@services/expense.service';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';
import { ExpenseCategoryService } from '@services/expenseCategory.service';
import { AccountService } from '@services/account.service';
import { Category } from '@models/category.model';
import { Account } from '@models/account.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    BtnComponent,
    DatePipe,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Input() transactionDetail!: TransactionDetail;
  statusCreateRegister: RequestStatus = 'init';
  stateTransaction: stateTransaction = 'create'
  // viewMode: boolean = false;
  // editMode: boolean = false;
  // createMode: boolean = true;
  expenseCategories$: Category[] | null = null;
  accounts$: Account[] | null = null;

  //Date
  now = new Date();
  year = this.now.getFullYear();
  month = String(this.now.getMonth() + 1).padStart(2, '0');
  day = String(this.now.getDate()).padStart(2, '0');
  currentDate = `${this.year}-${this.month}-${this.day}`;

  form = this.formBuilder.nonNullable.group({
    type: [''],
    amount: ['', [Validators.required]],
    sourceAccount: [''],
    destinationAccount: [''],
    category: [''],
    description: [''],
    date: [this.currentDate],
  });

  showRegister = false;
  showPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private expenseCategoryService: ExpenseCategoryService,
    private accountService: AccountService,
    private router: Router // private datePipe: DatePipe
  ) {
    // this.currentDate = this.datePipe.transform(this.now, 'yyyy-MM-dd'); TODO(optimizar la gestion de la fecha)
  }

  ngOnInit() {
    this.expenseCategoryService.categories$.subscribe((categories) => {
      this.expenseCategories$ = categories;
    });
    this.accountService.accounts$.subscribe((accounts) => {
      this.accounts$ = accounts;
    });

    if (this.transactionDetail.date === '') {
      this.stateTransaction = 'create';
      this.fillFormDefault();
    } else {
      this.fillForm();
      this.disableForm();
    }
  }

  createNewRegiste() {
    if (this.form.valid) {
      this.statusCreateRegister = 'loading';

      const {
        description,
        amount,
        sourceAccount,
        category,
        date,
        destinationAccount,
      } = this.form.getRawValue();

      let formattedDate: string | null = '';

      const dateNow = new Date();
      if (date === this.currentDate) {
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

      const transactionDto: TransactionDetail = {
        type: this.transactionDetail.type,
        id: this.transactionDetail.id,
        amount: expenseValue,
        description: description,
        date: formattedDate,
        sourceAccountName: sourceAccount,
        category: category,
        destinationAccountName: destinationAccount,
      };
      if (this.transactionDetail.date === '') {
        this.expenseService.createExpense(transactionDto).subscribe({
          next: () => {
            this.statusCreateRegister = 'success';
            this.closeFormDialog();
            // this.expensesComponent.
            // this.router.navigate(['/expenses']);
          },
          error: (error) => {
            this.statusCreateRegister = 'failed';
            console.log(error);
          },
        });
      } else if (this.transactionDetail.date !== '') {
        console.log(transactionDto);

        this.expenseService.updateExpense(transactionDto).subscribe({
          next: () => {
            this.statusCreateRegister = 'success';
            this.closeFormDialog();
            // this.newExpenseDialog.close();
            // this.expensesComponent.
            // this.router.navigate(['/expenses']);
          },
          error: (error) => {
            this.statusCreateRegister = 'failed';
            console.log(error);
          },
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  fillFormDefault() {
    this.form.controls.sourceAccount.setValue('Cash');
    this.form.controls.category.setValue('Others');
  }

  fillForm() {
    let amountValue = this.transactionDetail.amount.toString();
    this.form.controls.amount.setValue(amountValue);

    this.form.controls.sourceAccount.setValue(
      this.transactionDetail.sourceAccountName
    );

    this.form.controls.destinationAccount.setValue(
      this.transactionDetail.destinationAccountName
    );
    this.form.controls.category.setValue(this.transactionDetail.category);
    this.form.controls.description.setValue(this.transactionDetail.description);

    //Date
    if (this.transactionDetail.date != null) {
      const dateReceived: string = this.transactionDetail.date;
      const date: Date = new Date(dateReceived);

      const year: number = date.getFullYear();
      const month: number = date.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
      const day: number = date.getDate();

      // Formatear el mes y el día a dos dígitos si es necesario
      const formattedMonth: string =
        month < 10 ? '0' + month : month.toString();
      const formattedDay: string = day < 10 ? '0' + day : day.toString();

      const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

      this.form.controls.date.setValue(formattedDate);
    }
  }

  enableForm() {
    this.form.controls.amount.enable();
    this.form.controls.sourceAccount.enable();
    this.form.controls.destinationAccount.enable();
    this.form.controls.category.enable();
    this.form.controls.description.enable();
    this.form.controls.date.enable();

    this.stateTransaction = 'edit';
  }

  disableForm() {
    this.form.controls.amount.disable();
    this.form.controls.sourceAccount.disable();
    this.form.controls.destinationAccount.disable();
    this.form.controls.category.disable();
    this.form.controls.description.disable();
    this.form.controls.date.disable();

    this.stateTransaction = 'view';
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
