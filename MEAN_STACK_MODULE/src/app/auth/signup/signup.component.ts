import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { ConfirmPasswordValidator } from "./confirm-password.validator";


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  submitted = false;
  title: string = 'Sign Up';
  signupForm: FormGroup
  private authStatusSub: Subscription;

  constructor(public authService: AuthService,
    public route: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(9), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },
    {
      validator: ConfirmPasswordValidator("password", "confirm_password")
    }
    );
  }

  onSignup() {
    this.submitted = true;
    if(this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.signupForm.value.name, this.signupForm.value.role,
      this.signupForm.value.phone, this.signupForm.value.email, this.signupForm.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
