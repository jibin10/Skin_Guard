import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { UsersService } from "../user.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: "./user-role.component.html",
  styleUrls: ["./user-role.component.css"]
})
export class UserRoleComponent implements OnInit, OnDestroy {
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
      name: new FormControl(null, { validators: [Validators.required] }),
      role: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.usersService.getUserRole(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.form.setValue({
            name: userData.name,
            role: userData.role
          });
        });
      } else {
        console.log("No id found, open in edit mode");
      }
    });
  }

  onUpdateUserRole() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'edit') {
      this.usersService.updateUserRole(this.userId,
        this.form.value.name,
        this.form.value.role);
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
