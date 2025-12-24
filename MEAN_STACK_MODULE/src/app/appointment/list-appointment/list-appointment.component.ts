import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { AppointmentData } from "../appointment.model";
import { AppointmentService } from "../appointment.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm_dialog/confirm-dialog.component';


@Component({
  selector: "app-User",
  templateUrl: "./list-appointment.component.html",
  styleUrls: ["./list-appointment.component.css"]
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  dialog_result: string = '';
  appointmentData: AppointmentData[] = [];
  isLoading = false;
  totalAppointments = 0;
  appointmentsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];
  userIsAuthenticated = false;

  userId: string;
  role: string;
  private appointmentsSub: Subscription = new Subscription;
  private authStatusSub = new Subscription;

  constructor(public appointmentService: AppointmentService, private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.appointmentService.getAppointments(this.appointmentsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();
    this.appointmentsSub = this.appointmentService.getAppointmentUpdateListener()
    .subscribe((appointmentData: {appointments: AppointmentData[], appointmentsCount: number}) => {
      this.isLoading = false;
      this.appointmentData = this.filterApp(appointmentData.appointments, this.role);
      this.totalAppointments = this.appointmentData.length;
      console.log(this.appointmentData);
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getRole();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.appointmentsPerPage = pageData.pageSize;
    this.appointmentService.getAppointments(this.appointmentsPerPage, this.currentPage);
  }

  filterApp(appData: AppointmentData[], role: string) {
    var finalData = new Array();
    if(role == 'Patient') {
      for(let index in appData) {
        if(appData[index].patient_id == this.userId && appData[index].status == 'open') {
          finalData.push(appData[index]);
        }
      }
    }
    else {
      for(let index in appData) {
        if(appData[index].status == 'open') {
          finalData.push(appData[index]);
        }
      }
    }
    return finalData;
  }

  confirmDialog(userId: string): void {
    const dialogData = {title: "Delete appointment", message: "Are you sure you want to delete it?. If you click 'Delete' it is irreversible!."};
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.dialog_result = dialogResult;
      if(this.dialog_result) {
        this.onDelete(userId);
      }
    });
  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.appointmentService.deleteUser(userId).subscribe(() => {
      this.appointmentService.getAppointments(this.appointmentsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.appointmentsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
