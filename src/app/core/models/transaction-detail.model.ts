export interface TransactionDetail {
  type: string;
  id: number;
  description: string;
  date: string | null;
  amount: number;
  category: string;
  sourceAccountName: string;
  destinationAccountName: string;
}

export interface SummaryTransaction {
  transactionDetails: TransactionDetail[],
  totalTransactions: number
}

export type stateTransaction = 'create' | 'edit' | 'view';
