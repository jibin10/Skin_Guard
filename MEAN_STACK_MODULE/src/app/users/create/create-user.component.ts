import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ConfirmPasswordValidator } from "../../auth/signup/confirm-password.validator";

import { UsersService } from "../user.service";
import { UsersData } from "../user.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  enteredUser = "";
  isLoading = false;
  signupForm: FormGroup;
  usersData: UsersData;
  private action = 'create';
  private userId: string;
  private authStatusSub: Subscription;

  constructor(public usersService: UsersService,
    public route: ActivatedRoute,
    public authService: AuthService, private fb: FormBuilder) {}

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
    this.action = 'create';
    this.userId = null;
  }

  onUserSubmit() {
    if(this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.usersService.createUser(this.signupForm.value.name, this.signupForm.value.role,
      this.signupForm.value.phone, this.signupForm.value.email, this.signupForm.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
