import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RequestStatus } from '@models/request-status.model';
import { TransactionDetail } from '@models/transaction-detail.model';
import { ExpenseService } from '@services/expense.service';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';
import { ExpenseCategoryService } from '@services/expense-category.service';
import { AccountService } from '@services/account.service';
import { CategoryDto } from '@models/category.model';
import { Account } from '@models/account.model';
import { IncomeService } from '@services/income.service';
import { TransferService } from '@services/transfer.service';
import { IncomeCategoryService } from '@services/income-category.service';
import { CustomValidators } from '@utils/validators';
import { stateProcess } from '@models/stateProcess.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    BtnComponent,
    DatePipe,
    CurrencyPipe,
  ],
  providers: [CurrencyPipe],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Input() transactionDetail!: TransactionDetail;
  statusRegister: RequestStatus = 'init';
  stateTransaction: stateProcess = 'create';
  categories$: CategoryDto[] | null = null;
  accounts$: Account[] | null = null;

  formattedTransactionDetailDate: string = '';
  //Date
  now = new Date();
  currentDate = new DatePipe('en-US').transform(this.now, 'yyyy-MM-dd');

  form = this.formBuilder.nonNullable.group(
    {
      type: [''],
      amount: ['', [Validators.required]],
      sourceAccount: [''],
      destinationAccount: [''],
      category: [''],
      description: [''],
      date: [this.currentDate],
    },
    {
      validators: [
        CustomValidators.DifferentAccountsValidator(
          'sourceAccount',
          'destinationAccount'
        ),
      ],
    }
  );

  showRegister = false;
  showPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService,
    private accountService: AccountService,
    private incomeService: IncomeService,
    private transferService: TransferService,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    if (this.transactionDetail.type === 'expense') {
      this.expenseCategoryService.enabledCategories$.subscribe((categories) => {
        this.categories$ = categories;
      });
    } else if (this.transactionDetail.type === 'income') {
      this.incomeCategoryService.categories$.subscribe((categories) => {
        this.categories$ = categories;
      });
    }
    this.accountService.enabledAccounts$.subscribe((accounts) => {
      this.accounts$ = accounts;
    });

    if (this.transactionDetail.id === null) {
      this.stateTransaction = 'create';
      this.fillFormDefault();
    } else {
      this.fillForm();
      this.disableForm();
    }

    this.form.valueChanges.subscribe((form) => {
      if (form.amount && typeof form.amount === 'string') {
        const formattedAmount = this.applyCurrencyFormatToAmount(form.amount);
        this.form.controls.amount.setValue(formattedAmount, { emitEvent: false });
      }
    });
  }

  applyCurrencyFormatToAmount(amount: string) {
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericAmount)) {
      return this.currencyPipe.transform(
        numericAmount,
        'COP',
        '$',
        '1.0-0'
      ) || '';
    }
    return '';
  }

  createNewRegiste() {
    if (this.form.valid) {
      this.statusRegister = 'loading';

      const {
        description,
        amount,
        sourceAccount,
        category,
        date,
        destinationAccount,
      } = this.form.getRawValue();

      let formattedDate: string | null = '';

      if (
        this.transactionDetail.id === null ||
        this.formattedTransactionDetailDate !== date
      ) {
        if (date === this.currentDate) {
          formattedDate = new DatePipe('en-US').transform(
            this.now,
            'yyyy-MM-ddTHH:mm:ss.SSS'
          );
        } else {
          formattedDate = new DatePipe('en-US').transform(
            date,
            'yyyy-MM-ddTHH:mm:ss.SSS'
          );
        }
      } else if (this.formattedTransactionDetailDate === date) {
        formattedDate = this.transactionDetail.date;
      }
      const cleanedAmount = parseFloat(amount.replace(/\D/g, ''));

      const transactionDto: TransactionDetail = {
        type: this.transactionDetail.type,
        id: this.transactionDetail.id,
        amount: cleanedAmount,
        description: description,
        date: formattedDate,
        sourceAccountName: sourceAccount,
        category: category,
        destinationAccountName: destinationAccount,
      };
      if (this.transactionDetail.type === 'expense') {
        if (this.transactionDetail.id === null) {
          this.expenseService.createExpense(transactionDto).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
              // this.router.navigate(['/transactions/expenses']);
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        } else if (this.transactionDetail.date !== '') {
          console.log(transactionDto);

          this.expenseService.updateExpense(transactionDto).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
              // this.router.navigate(['/transactions/expenses']);
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        }
      } else if (this.transactionDetail.type === 'income') {
        if (this.transactionDetail.id === null) {
          this.incomeService.createIncome(transactionDto).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
              // this.router.navigate(['/transactions/incomes']);
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        } else if (this.transactionDetail.date !== '') {
          this.incomeService.updateIncome(transactionDto).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
              // this.router.navigate(['/transactions/incomes']);
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        }
      } else if (this.transactionDetail.type === 'transfer') {
        if (this.transactionDetail.id === null) {
          this.transferService.createTransfer(transactionDto).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
              // this.router.navigate(['/transactions/transfers']);
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        } else if (this.transactionDetail.date !== '') {
          this.transferService.updateTransfer(transactionDto).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
              // this.router.navigate(['/transactions/transfers']);
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        }
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  fillFormDefault() {
    if (this.transactionDetail.type !== 'transfer') {
      this.form.controls.sourceAccount.setValue('Cash');
      this.form.controls.category.setValue('Others');
    }
  }

  fillForm() {
    const amountValue = this.transactionDetail.amount.toString();
    const formattedAmount = this.applyCurrencyFormatToAmount(amountValue);
    this.form.controls.amount.setValue(formattedAmount);
    
    this.form.controls.sourceAccount.setValue(
      this.transactionDetail.sourceAccountName
    );
    //TODO(configurar verificacion de cuentas deben ser diferentes source and destination)
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

      this.formattedTransactionDetailDate = `${year}-${formattedMonth}-${formattedDay}`;

      this.form.controls.date.setValue(this.formattedTransactionDetailDate);
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
