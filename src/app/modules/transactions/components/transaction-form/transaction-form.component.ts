import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
import { TransactionService } from '@services/transaction.service';
import { DateFilterService } from '@services/date-filter.service';

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

  formattedTransactionDetailDate: string | null = '';
  //Date
  now = new Date();
  currentDate = new DatePipe('en-US').transform(this.now, 'yyyy-MM-dd');

  showRegister = false;
  showPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  // Parametros para actualizar la lista de transactios
  currentDate$: string = '';
  nextDate$: string = '';

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
        CustomValidators.MismatchValidator(
          'sourceAccount',
          'destinationAccount'
        ),
      ],
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private expenseCategoryService: ExpenseCategoryService,
    private incomeCategoryService: IncomeCategoryService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private incomeService: IncomeService,
    private transferService: TransferService,
    private currencyPipe: CurrencyPipe,
    private location: Location,
    private dateFilterService: DateFilterService
  ) {}

  ngOnInit() {
    if (this.transactionDetail.type === 'expense') {
      this.expenseCategoryService.enabledCategories$.subscribe((categories) => {
        this.categories$ = categories;
      });
    } else if (this.transactionDetail.type === 'income') {
      this.incomeCategoryService.enabledCategories$.subscribe((categories) => {
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

    this.dateFilterService.currentDateFormatted$.subscribe((date) => {
      this.currentDate$ = date;
    });

    this.dateFilterService.nextDateFormatted$.subscribe((date) => {
      this.nextDate$ = date;
    });

    this.form.valueChanges.subscribe((form) => {
      if (form.amount && typeof form.amount === 'string') {
        const formattedAmount = this.applyCurrencyFormatToAmount(form.amount);
        this.form.controls.amount.setValue(formattedAmount, {
          emitEvent: false,
        });
      }
    });
  }

  private applyCurrencyFormatToAmount(amount: string) {
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericAmount)) {
      return (
        this.currencyPipe.transform(numericAmount, 'COP', '$', '1.0-0') || ''
      );
    }
    return '';
  }

  private formatDateToDateTime(date: Date | string | null): string {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }

  private formatDateToYearMonth(date: Date | string): string {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd')!;
  }

  createOrUpdateTransaction() {
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
          formattedDate = this.formatDateToDateTime(this.now);
        } else {
          formattedDate = this.formatDateToDateTime(date);
          console.log(formattedDate); //TODO (Eliminar)
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

      const service = this.getServiceByType(this.transactionDetail.type);

      if (service) {
        const method = this.transactionDetail.id ? 'update' : 'create';
        service[method](transactionDto).subscribe({
          next: () => {
            this.statusRegister = 'success';
            this.updateTransactionData()
            this.closeFormDialog();
          },
          error: (error) => {
            this.statusRegister = 'failed';
            console.log(error);
          },
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateTransactionData() {
    const currentUrl = this.location.path();
    if (currentUrl === '/transactions') {
      console.log(currentUrl);
      this.transactionService
        .getAll(this.currentDate$, this.nextDate$)
        .subscribe();
    }
  }

  fillFormDefault() {
    if (this.transactionDetail.type !== 'transfer') {
      this.form.patchValue({
        sourceAccount: 'Cash',
        category: 'Others',
      });
    }
  }

  fillForm() {
    const {
      amount,
      sourceAccountName,
      destinationAccountName,
      category,
      description,
      date,
    } = this.transactionDetail;

    this.form.controls.amount.setValue(
      this.applyCurrencyFormatToAmount(amount.toString())
    );
    this.form.controls.sourceAccount.setValue(sourceAccountName);
    this.form.controls.destinationAccount.setValue(destinationAccountName);
    this.form.controls.category.setValue(category);
    this.form.controls.description.setValue(description);

    if (date) {
      const dateRecived: Date = new Date(date);
      this.formattedTransactionDetailDate =
        this.formatDateToYearMonth(dateRecived);
      this.form.controls.date.setValue(this.formattedTransactionDetailDate);
    }
  }

  enableForm() {
    this.form.enable();
    this.stateTransaction = 'edit';
  }

  disableForm() {
    this.form.disable();
    this.stateTransaction = 'view';
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private getServiceByType(type: string) {
    switch (type) {
      case 'expense':
        return this.expenseService;
      case 'income':
        return this.incomeService;
      case 'transfer':
        return this.transferService;
      default:
        return null;
    }
  }
}
