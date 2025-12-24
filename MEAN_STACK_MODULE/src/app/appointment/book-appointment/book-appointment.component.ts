import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { AppointmentService } from "../appointment.service";
import { AppointmentData } from "../appointment.model";

import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit, OnDestroy {
  enteredUser = "";
  isLoading = false;
  userIsAuthenticated = false;
  appForm: FormGroup;
  appointmentData: AppointmentData;
  doctorData: any;

  private action = 'create';
  private curr_date = new Date();
  private userId: string;
  private authStatusSub: Subscription;

  constructor(public appointmentService: AppointmentService,
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
      app_date: ['', Validators.required],
      app_time: ['', Validators.required],
      doctor: ['', Validators.required],
      condition: ['']
    }
    );
    this.appointmentService.getDoctor().subscribe(doctorData => {
      this.doctorData = doctorData.doctors;
    });

  }

  onUserSubmit() {
    if(this.appForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.appointmentService.createAppointment(String(this.curr_date),
      this.userId, this.appForm.value.app_date,
      this.appForm.value.app_time,
      this.appForm.value.doctor, this.appForm.value.condition);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
