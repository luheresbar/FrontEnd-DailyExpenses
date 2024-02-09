export interface Expense {
  expenseId: number;
  userId: number;
  expense: number;
  description: string;
  expenseDate: string | null;
  accountName: string;
  categoryName: string;
}

export interface CreateExpenseDTO extends Omit<Expense, 'expenseId' | 'userId'> {
  
}

export interface SummaryExpenses {
  expenses: Expense[],
  totalExpense: number
}