import { UserProfile } from "./user.model"

export interface Category {
  userId: UserProfile['userId'],
  categoryName: string,
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