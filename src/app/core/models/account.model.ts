import { UserProfile } from "./user.model"

export interface Account {
  userId: UserProfile['userId'],
  accountName: string,
  availableMoney: number,
  available: boolean
}

export interface SummaryAccountsDto {
  enabledAccounts: Account[],
  disabledAccounts: Account[],
  totalAvailableMoney: number
}

export interface AccountPK extends Pick<Account, 'userId' | 'accountName'> {
}

export interface UpdateAccountDto extends Account{
  newAccountName: string,
}



// export interface AccountDTO extends Omit<Account, 'userId' | 'availableMoney' | 'available'> {}