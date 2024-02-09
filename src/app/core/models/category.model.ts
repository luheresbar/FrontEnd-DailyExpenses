export interface Category {
  categoryName: string,
  userId: number,

}

export interface CategoryDTO extends Omit<Category, 'userId'> {}