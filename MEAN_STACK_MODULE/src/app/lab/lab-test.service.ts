import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { LabTestRecord } from "./lab-test.model";

const BACKEND_URL = environment.apiUrl + '/patient/';
const INSPECT_URL = environment.apiUrl + '/inspect/';

@Injectable({providedIn: 'root'})
export class LabTestService {

  private patient_records: LabTestRecord[] = [];
  private prUpdated = new Subject<{patient_records: LabTestRecord[], prCount: number}>();

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

  getLabResult(patient_id: string) {
    return this.http.get<{
      _id: string,
      LabResult: number
    }>(INSPECT_URL + "lab_result/" + patient_id);
  }

  updateLabResult(id: string, lab_result: number) {
    let labData: any | FormData;
    labData = {
      test_id: id,
      lab_result: lab_result
    };
    this.http
      .put(INSPECT_URL + "lab_result/" + id, labData)
      .subscribe(response => {
        this.router.navigate(["/lab/list"]);
      });
  }

  getPRUpdateListener(){
    return this.prUpdated.asObservable();
  }

}
