export interface FoodNoId {
  title: string,
  ingredients: string[],
  method: string,
  cookingTime: string,
}

export interface FoodItem extends FoodNoId {
  id: string,
}

export interface RecipeListProps {
  data: FoodItem[],
}