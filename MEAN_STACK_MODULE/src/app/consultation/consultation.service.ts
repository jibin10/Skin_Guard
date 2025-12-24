import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AppointmentData } from '../appointment/appointment.model';

const BACKEND_URL = environment.apiUrl + '/appointment/';


@Injectable({providedIn: 'root'})
export class ConsultationService {

  private appointmentData: AppointmentData[] = [];

  private appointmentUpdated = new Subject<{appointments: AppointmentData[], appointmentsCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getAppointments(appointmentsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${appointmentsPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, appointments: any, maxAppointments: number}>(
        BACKEND_URL + queryParams
        )
        .pipe(map((appointmentsData) => {
          return { appointments: appointmentsData.appointments.map(appointment => {
            return {
              id: appointment._id,
              patient_id: appointment.patient_id,
              booking_date: appointment.booking_date,
              appointment_date: appointment.appointment_date,
              appointment_time: appointment.appointment_time,
              doctor: appointment.doctor,
              condition: appointment.condition,
              status: appointment.status,
              user_details: appointment.user_details,
              doctor_details: appointment.doctor_details
            };
          }), maxAppointments: appointmentsData.maxAppointments};
        }))
        .subscribe((transformedAppointData) => {
          this.appointmentData = transformedAppointData.appointments;
          this.appointmentUpdated.next({
            appointments: [...this.appointmentData],
            appointmentsCount: transformedAppointData.maxAppointments
          });
        });
  }

  getAppointmentUpdateListener(){
    return this.appointmentUpdated.asObservable();
  }

  getAppointment(id: string) {
    return this.http.get<{
      _id: string,
      name: string,
      email: string,
      password: string,
      role: string
    }>(BACKEND_URL + id);
  }

  getUserRole(user_id: string) {
    return this.http.get<{
      _id: string,
      name: string,
      role: string
    }>(BACKEND_URL + "user_role/" + user_id);
  }

  createAppointment(curr_date: string, userId: string, app_date: string, app_time: string, doctor: string, condition: string) {

    const appData = {patient_id: userId, booking_date: curr_date, app_date: app_date,
    app_time: app_time, doctor: doctor, condition: condition };
    this.http.post(BACKEND_URL + "create", appData)
    .subscribe((responseData) => {
      console.log(responseData);
      //this.router.navigate(["/appointment/list"]);
    });

  }

  getDoctor() {
    return this.http.get<{message: string, doctors: any}>(
      BACKEND_URL + "all_doctors"
    );
  }

  updateUserRole(id: string, name: string, role: string) {
    let userRoleData: any | FormData;
    userRoleData = {
      id: id,
      name: name,
      role: role
    };
    this.http
      .put(BACKEND_URL + "user_role/" + id, userRoleData)
      .subscribe(response => {
        this.router.navigate(["/user/list"]);
      });
  }

  deleteUser(userId: string) {
      return this.http.delete(BACKEND_URL + userId);
  }

}
