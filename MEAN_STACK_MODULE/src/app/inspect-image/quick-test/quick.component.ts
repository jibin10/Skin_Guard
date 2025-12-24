import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { InspectService } from "../inspect-image.service";
import { mimeType } from "./mime-type.validator";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-quick-test",
  templateUrl: "./quick.component.html",
  styleUrls: ["./quick.component.css"]
})
export class QuickTestComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  isLoading = false;
  imagePreview: string;
  form: FormGroup;
  private mode = '';
  private userId: string;
  private appId: string;
  private authStatusSub: Subscription;

  constructor(
    public inspectService: InspectService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      details: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId') && paramMap.has('appId')) {
        this.mode = 'create';
        this.userId = paramMap.get('userId');
        this.appId = paramMap.get('appId');
      } else {
        this.mode = '';
        this.userId = null;
        this.appId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveDetails() {
    if (this.form.invalid) {
      return;
    }
    if(this.mode === 'create') {
      this.isLoading = true;
      this.inspectService.addQuickTestRecord(
        this.userId,
        this.appId,
        String(new Date()),
        this.form.value.details,
        this.form.value.image
      );
    } else {
      /* this.inspectService.updateRecord(
        this.recordId,
        this.form.value.patient,
        this.form.value.details,
        this.form.value.image
      ); */
    }
    this.form.reset()
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
