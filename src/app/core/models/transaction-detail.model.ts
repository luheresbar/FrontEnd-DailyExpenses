export interface TransactionDetail {
  type: string;
  id: number;
  description: string;
  date: string;
  amount: number;
  category: string;
  sourceAccountName: string;
  destinationAccountName: string;
}

export interface SummaryTransaction {
  transactionDetails: TransactionDetail[],
  totalTransactions: number
}

export interface ExpenseDto {
  expense: number;
  description: string;
  expenseDate: string | null;
  accountName: string;
  categoryName: string;
}
