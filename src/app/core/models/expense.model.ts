export interface ExpenseDto {
  expense: number;
  description: string;
  expenseDate: string | null;
  accountName: string;
  categoryName: string;
}

// export interface CreateExpenseDTO extends Omit<Expense, 'expenseId' | 'userId'> {

// }
