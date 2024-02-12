export interface TransactionDetail {
  type: string;
  description: string;
  date: string;
  amount: number;
  sourceAccountName: string;
  destinationAccountName: string;
}
