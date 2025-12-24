import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { UsersService } from "../user.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.css"]
})
export class PasswordComponent implements OnInit, OnDestroy {
  isLoading = false;
  status = 'pending';
  remarks = '';
  form: FormGroup;
  private mode = '';
  private userId: string;
  private authStatusSub: Subscription;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      password: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = false;
      } else {
        console.log("No id found, open in edit mode");
      }
    });
  }

  onUpdatePassword() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'edit') {
      this.usersService.updatePassword(this.userId, this.form.value.password);
    }
    else {
      console.log("Not in edit mode");
    }
    this.form.reset()
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
