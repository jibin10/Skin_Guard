import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PatientRecord } from "./patient-record.model";

const BACKEND_URL = environment.apiUrl + '/patient/';
const MASTER_URL = environment.apiUrl + '/master/';

@Injectable({providedIn: 'root'})
export class PRService {

  private patient_records: PatientRecord[] = [];
  private prUpdated = new Subject<{patient_records: PatientRecord[], prCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPRs(prPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${prPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, patient_records: any, maxPR: number}>(
        BACKEND_URL + "list_pr" + queryParams
        )
        .pipe(map((prData) => {
          return { patient_records: prData.patient_records.map(record => {
            return {
              id: record._id,
              name: record.name,
              phone: record.phone,
              email: record.email,
              appointment: record.appointment_details,
              quick_test: record.quick_test,
              adv_test: record.adv_test
            };
          }), maxPR: prData.maxPR};
        }))
        .subscribe((transformedPRData) => {
          this.patient_records = transformedPRData.patient_records;
          this.prUpdated.next({
            patient_records: [...this.patient_records],
            prCount: transformedPRData.maxPR
          });
        });
  }

  getPRUpdateListener(){
    return this.prUpdated.asObservable();
  }

}
