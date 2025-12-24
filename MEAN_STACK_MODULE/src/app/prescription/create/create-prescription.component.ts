import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { PrescriptionService } from "../prescription.service";
import { PrescriptionData } from "../prescription.model";

import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: './create-prescription.component.html',
  styleUrls: ['./create-prescription.component.css']
})
export class CreatePrescriptionComponent implements OnInit, OnDestroy {
  enteredUser = "";
  isLoading = false;
  userIsAuthenticated = false;
  appForm: FormGroup;
  prescriptionData: PrescriptionData;

  private action = '';
  private curr_date = new Date();
  private userId: string;
  private appointmentId: string;
  private patientId: string;
  private authStatusSub: Subscription;

  constructor(public prescriptionService: PrescriptionService,
    public route: ActivatedRoute,
    public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
        .subscribe(
          authStatus => {
            this.userIsAuthenticated = authStatus;
            this.userId = this.authService.getUserId();
            this.isLoading = false;
          }
        );

    this.appForm = this.fb.group({
      prescription: ['', Validators.required],
      tests: ['', Validators.required]
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('appointmentId') && paramMap.has('patientId')) {
        this.appointmentId = paramMap.get('appointmentId');
        this.patientId = paramMap.get('patientId');
        this.action = "create"
      }
      else {
        this.action = '';
      }
    });
  }

  onSubmit() {
    if(this.appForm.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.action == 'create') {
      this.prescriptionService.createPrescription(
        this.appointmentId, this.patientId,
        this.appForm.value.prescription, this.appForm.value.tests);
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
