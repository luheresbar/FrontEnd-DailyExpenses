export interface Account {
  userId: number | null,
  accountName: string,
  availableMoney: number,
  available: boolean
}

export interface SummaryAccountsDto {
  enabledAccounts: Account[],
  disabledAccounts: Account[],
  totalAvailableMoney: number
}

export interface AccountPK {
  userId: number | null,
  accountName: string,
}

export interface UpdateAccountDto extends Account{
  newAccountName: string,
}



// export interface AccountDTO extends Omit<Account, 'userId' | 'availableMoney' | 'available'> {}