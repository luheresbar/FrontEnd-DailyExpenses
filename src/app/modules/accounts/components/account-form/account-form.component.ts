import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account, UpdateAccountDto } from '@models/account.model';
import { RequestStatus } from '@models/request-status.model';
import { stateProcess } from '@models/stateProcess.model';
import { AccountService } from '@services/account.service';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { FormValidationMessageComponent } from '@shared/components/atoms/form-validation-message/form-validation-message.component';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormValidationMessageComponent,
    BtnComponent,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Input() accountDetail!: Account;
  statusRegister: RequestStatus = 'init';
  stateProcess: stateProcess = 'create';
  accounts$: Account[] | null = null;

  formattedTransactionDetailDate: string = '';
  //Date
  now = new Date();
  currentDate = new DatePipe('en-US').transform(this.now, 'yyyy-MM-dd');

  form = this.formBuilder.nonNullable.group({
    accountName: ['', [Validators.required]],
    availableMoney: [''],
  });

  showRegister = false;
  showPassword = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    if (Object.keys(this.accountDetail).length === 0) {
      this.stateProcess = 'create';
    } else {
      
      this.fillForm();
      this.disableForm();
    }
  }

  createNewRegiste() {
      if (this.form.valid) {
        this.statusRegister = 'loading';
        const { accountName: accountName, availableMoney: availableMoney } =
          this.form.getRawValue();
        const expenseValue = parseFloat(availableMoney);

        const account: Account = {
          userId: this.accountDetail.userId,
          accountName:accountName,
          availableMoney:expenseValue,
          available: true
        };
        if (Object.keys(this.accountDetail).length === 0) {
          
          this.accountService.createAccount(account).subscribe({
            next: () => {
              this.statusRegister = 'success';
              this.closeFormDialog();
            },
            error: (error) => {
              this.statusRegister = 'failed';
              console.log(error);
            },
          });
        } else if (Object.keys(this.accountDetail).length !== 0) {
          const accountDto: UpdateAccountDto = {
            userId: this.accountDetail.userId,
            accountName: this.accountDetail.accountName,
            newAccountName: accountName,
            availableMoney: expenseValue,
            available: this.accountDetail.available
          };
          console.log(accountDto); //TODO (Eliminar linea)
            this.accountService.updateAccount(accountDto).subscribe({
              next: () => {
                this.statusRegister = 'success';
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

  fillForm() {
    this.form.controls.accountName.setValue(this.accountDetail.accountName);
    let amountValue = this.accountDetail.availableMoney.toString();
    this.form.controls.availableMoney.setValue(amountValue);
  }

  enableForm() {
    this.form.controls.availableMoney.enable();
    this.form.controls.accountName.enable();

    this.stateProcess = 'edit';
  }

  disableForm() {
    this.form.controls.availableMoney.disable();
    this.form.controls.accountName.disable();

    this.stateProcess = 'view';
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}