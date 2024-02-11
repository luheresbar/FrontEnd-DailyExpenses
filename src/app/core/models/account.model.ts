export interface Account {
  accountName: string,
  userId: number,
  availableMoney: number,
  available: boolean
}

export interface SummaryAccounts {
  accounts: Account[],
  totalAvailableMoney: number
}


export interface AccountDTO extends Omit<Account, 'userId' | 'availableMoney' | 'available'> {}