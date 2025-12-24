import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PrescriptionData } from './prescription.model';

const BACKEND_URL = environment.apiUrl + '/prescription/';


@Injectable({providedIn: 'root'})
export class PrescriptionService {

  private prescriptionData: PrescriptionData[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  createPrescription(appointmentId: string, patientId: string,
    prescription: string, tests: string) {

    const presData = { patient_id: patientId, appointment_id: appointmentId,
      prescription: prescription, tests: tests };

    this.http.post(BACKEND_URL + "create", presData)
    .subscribe((responseData) => {
      this.router.navigate(["/consultation/list"]);
    });

  }
}
