import { UserProfile } from "./user.model";

export interface TransactionDetail {
  type: string;
  id: UserProfile['userId'];
  description: string;
  date: string | null;
  amount: number;
  category: string;
  sourceAccountName: string;
  destinationAccountName: string;
}


export interface SummaryTransaction {
  transactionDetails: TransactionDetail[],
  totalExpense: number,
  totalIncome: number
}

