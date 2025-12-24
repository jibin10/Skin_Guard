import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { LabTestService } from "../lab-test.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: "./update-lab-result.component.html",
  styleUrls: ["./update-lab-result.component.css"]
})
export class UpdateLabComponent implements OnInit, OnDestroy {
  isLoading = false;
  status = 'pending';
  remarks = '';
  form: FormGroup;
  private mode = '';
  private testId: string;
  private authStatusSub: Subscription;

  constructor(
    public labService: LabTestService,
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
      lab_result: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('testId')) {
        this.mode = 'edit';
        this.testId = paramMap.get('testId');
        this.isLoading = true;
        this.labService.getLabResult(this.testId).subscribe(labData => {
          this.isLoading = false;
          this.form.setValue({
            lab_result: String(labData.LabResult)
          });
        });
      } else {
        console.log("No id found, open in edit mode");
      }
    });
  }

  onUpdateLabResult() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'edit') {
      this.labService.updateLabResult(this.testId, this.form.value.lab_result);
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
