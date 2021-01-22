import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { expand, flyInOut } from "../animations/app.animation";
import { FeedbackService } from "../services/feedback.service";
import { Feedback, ContactType } from "../shared/feedback";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;",
  },
  animations: [flyInOut(), expand()],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild("fform") feedbackFormDirective;

  formErrors = {
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
  };

  validationMessages = {
    firstname: {
      required: "First name is required.",
      minlength: "First name must be at least 2 characters length.",
      maxlength: "First name can't be more than 25 characters length.",
    },
    lastname: {
      required: "Last name is required.",
      minlength: "Last name must be at least 2 characters length.",
      maxlength: "Last name can't be more than 25 characters length.",
    },
    telnum: {
      required: "Telephone is required.",
      pattern: "Telephone must contain only numbers.",
    },
    email: {
      required: "Email is required.",
      email: "Email not in valid format.",
    },
  };

  errMess: string;
  feedbackResponse: Feedback;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [
        "",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      email: ["", [Validators.required, Validators.email]],
      agree: false,
      contacttype: "None",
      message: "",
    });

    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key))
              this.formErrors[field] += messages[key] + " ";
          }
        }
      }
    }
  }

  ngOnInit() {}

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      (feedback) => {
        this.feedback = null;
        this.feedbackResponse = feedback;
      },
      (errMess) => {
        this.errMess = <any>errMess;
      }
    );
    setTimeout(() => {
      this.feedbackResponse = null;
    }, 5000);

    this.feedbackForm.reset({
      firstname: "",
      lastane: "",
      telnum: "",
      email: "",
      agree: false,
      contactype: "None",
      message: "",
    });
    this.feedbackFormDirective.resetForm();
  }

  test() {
    console.log("it should call the sonar analyze.");
  }
}
