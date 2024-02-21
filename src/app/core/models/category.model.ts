export interface Category extends Omit<CategoryDto, 'categoryType'> {

}

export interface CategoryDto  {
  categoryType: string,
  categoryName: string,
  userId: number,

}
// export interface CategoryDTO extends Omit<Category, 'userId'> {}