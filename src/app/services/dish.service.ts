import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish.class";
import { DISHES } from "../shared/dishes";

@Injectable({
  providedIn: "root",
})
export class DishService {
  constructor() {}

  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: string): Dish {
    return DISHES[parseInt(id)];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
}
