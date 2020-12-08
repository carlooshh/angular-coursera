import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Promotion } from "../shared/promotion.class";
import { PROMOTIONS } from "../shared/promotions";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  constructor() {}

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.id === id)[0]).pipe(
      delay(2000)
    );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}
