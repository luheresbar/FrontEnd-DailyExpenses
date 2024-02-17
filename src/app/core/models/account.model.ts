export interface Account {
  accountName: string,
  userId: number,
  availableMoney: number,
  available: boolean
}

export interface SummaryAccountsDto {
  enabledAccounts: Account[],
  disabledAccounts: Account[],
  totalAvailableMoney: number
}


// export interface AccountDTO extends Omit<Account, 'userId' | 'availableMoney' | 'available'> {}