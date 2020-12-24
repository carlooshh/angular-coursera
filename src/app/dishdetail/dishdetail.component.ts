import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Dish } from "../shared/dish.class";
import { switchMap } from "rxjs/operators";
import { Comment } from "../shared/comment.class";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DishService } from "../services/dish.service";
@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  @ViewChild("fform") commentFormDirective;

  commentForm: FormGroup;

  formErrors = {
    author: "",
    comment: "",
  };

  validationMessages = {
    author: {
      required: "Name is required.",
    },
    comment: {
      required: "Comment is required.",
      minlength: "Comment must be at least two characters.",
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private cmt: FormBuilder,
    @Inject("BaseURL") private BaseURL
  ) {
    this.createForm();
  }
  createForm(): void {
    this.commentForm = this.cmt.group({
      rating: [5],
      author: ["", [Validators.required]],
      comment: ["", [Validators.required, Validators.minLength(2)]],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear if has any
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && control.invalid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + "";
            }
          }
        }
      }
    }
  }

  onSubmit() {
    let comment: Comment;
    comment = this.commentForm.value;
    let d = new Date();
    comment.date = d.toISOString();
    this.dish.comments.push(comment);
    this.commentFormDirective.resetForm();
  }

  ngOnInit() {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));

    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params["id"]))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevAndNext(dish.id);
      });
  }

  setPrevAndNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];

    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
