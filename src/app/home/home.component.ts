import { Component, OnInit, ɵConsole } from "@angular/core";

import { Dish } from "../shared/dish.class";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion.class";
import { PromotionService } from "../services/promotion.service";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private LeaderService: LeaderService
  ) {}

  ngOnInit() {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader = this.LeaderService.getFeaturedLeader();
  }
}
