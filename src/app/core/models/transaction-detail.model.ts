export interface TransactionDetail {
  type: string;
  id: number | null;
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

