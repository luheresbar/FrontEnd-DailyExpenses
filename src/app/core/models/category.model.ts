export interface Category {
  categoryName: string,
  userId: number | null,
  available?: boolean
}

export interface CategoryDto extends Category {
  categoryType: string,
}

export interface UpdateCategoryDto extends Omit<CategoryDto, 'categoryType'> {
  newCategoryName: string
}

export interface SummaryCategoryDto {
  enabledCategories: CategoryDto[],
  disabledCategories: CategoryDto[],
}