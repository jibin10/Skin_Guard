import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { AppointmentData } from "../../appointment/appointment.model";
import { AppointmentService } from "../../appointment/appointment.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm_dialog/confirm-dialog.component';

@Component({
  selector: "app-User",
  templateUrl: "./archives.component.html",
  styleUrls: ["./archives.component.css"]
})
export class ArchivesComponent implements OnInit, OnDestroy {
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
      this.appointmentData = this.filterConsultation(appointmentData.appointments);
      this.totalAppointments = this.appointmentData.length;
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

  filterConsultation(appData:AppointmentData[]) {
    var closedData = new Array();
    for(let index in appData) {
      if(((appData[index].doctor == this.userId) && (appData[index].status == 'closed')) || (this.role == 'Admin' && appData[index].status == 'closed')) {
        closedData.push(appData[index]);
      }
    }
    return closedData;
  }


  ngOnDestroy() {
    this.appointmentsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
