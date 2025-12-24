import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { InspectService } from "../inspect-image.service";
import { InspectModel } from "../inspect-image.model";
import { mimeType } from "./mime-type.validator";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.css"]
})
export class ProcessComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  isLoading = false;
  imagePreview: string;
  form: FormGroup;
  record: InspectModel;
  private mode = 'create';
  private recordId: string;
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
      patient: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      details: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('recordId')) {
        this.mode = 'edit';
        this.recordId = paramMap.get('recordId');
        console.log("recordId", this.recordId);
        this.isLoading = true;
        this.inspectService.getRecord(this.recordId).subscribe(recordData => {
          this.isLoading = false;
          this.record = {
            id: recordData._id,
            patient: recordData.patient,
            skin_result: recordData.skin_result,
            details: recordData.details,
            imagePath: recordData.imagePath,
            creator: recordData.creator
          };
          this.form.setValue({
            patient: this.record.patient,
            details: this.record.details,
            image: this.record.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.recordId = null;
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
    this.isLoading = true;
    if(this.mode === 'create') {
      this.inspectService.addRecord(
        this.form.value.patient,
        this.form.value.details,
        this.form.value.image
      );
    } else {
      this.inspectService.updateRecord(
        this.recordId,
        this.form.value.patient,
        this.form.value.details,
        this.form.value.image
      );
    }
    this.form.reset()
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
