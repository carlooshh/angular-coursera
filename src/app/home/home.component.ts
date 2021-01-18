import { Component, OnInit, Inject } from "@angular/core";

import { Dish } from "../shared/dish.class";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion.class";
import { PromotionService } from "../services/promotion.service";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";
import { flyInOut, expand } from "../animations/app.animation";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;",
  },
  animations: [flyInOut(), expand()],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private LeaderService: LeaderService,
    @Inject("BaseURL") private BaseURL
  ) {}

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(
      (dish) => {
        this.dish = dish;
        console.log(dish);
      },
      (errMess) => {
        this.dishErrMess = <any>errMess;
      }
    );

    this.promotionService.getFeaturedPromotion().subscribe(
      (promotion) => {
        this.promotion = promotion;
        console.log(promotion);
      },
      (errMess) => {
        this.promotionErrMess = <any>errMess;
      }
    );

    this.LeaderService.getFeaturedLeader().subscribe(
      (leader) => {
        this.leader = leader;
        console.log(leader);
      },
      (errMess) => {
        this.leaderErrMess = <any>errMess;
      }
    );
  }
}
