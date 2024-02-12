export interface TransactionDetail {
  type: string;
  description: string;
  date: string;
  amount: number;
  category: string;
  sourceAccountName: string;
  destinationAccountName: string;
}

export interface SummaryExpenses {
  expenses: TransactionDetail[],
  totalExpense: number
}