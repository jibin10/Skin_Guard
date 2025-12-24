import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { InspectModel } from './inspect-image.model';
import { FastAPIModel } from './fastapi.model';

const BACKEND_URL = environment.apiUrl + '/inspect/';

@Injectable({providedIn: 'root'})
export class InspectService {
  private results_dict
  private records: InspectModel[] = [];
  private recordsUpdated = new Subject<{records: InspectModel[], recordCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getRecords(recordsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${recordsPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, records: any, maxRecords: number}>(
        BACKEND_URL + queryParams
        )
        .pipe(map((recordData) => {
          return { records: recordData.records.map(record => {
            return {
              id: record._id,
              patient: record.patient,
              details: record.details,
              skin_result: record.skin_result,
              imagePath: record.imagePath,
              creator: record.creator
            };
          }), maxRecords: recordData.maxRecords};
        }))
        .subscribe((transformedRecordData) => {
          this.records = transformedRecordData.records;
          this.recordsUpdated.next({
            records: [...this.records],
            recordCount: transformedRecordData.maxRecords
          });
        });
  }

  getRecordUpdateListener(){
    return this.recordsUpdated.asObservable();
  }

  getRecord(id: string) {
    return this.http.get<{
      _id: string,
      patient: string,
      details: string,
      skin_result: number,
      imagePath: string,
      creator: string
    }>(BACKEND_URL + id);

  }

  addRecord(patient: string, details: string, image: File) {
    const recordData = new FormData();
    recordData.append("patient", patient);
    recordData.append("details", details);
    recordData.append("image", image);

    this.http.post<{ message: string, record: InspectModel }>(
       BACKEND_URL,
       recordData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/inspect/list"]);
      });
  }

  addQuickTestRecord(userId: string, appId: string,
    test_date: string, details: string, image: File) {

    const recordData = new FormData();
    recordData.append("userId", userId);
    recordData.append("appId", appId);
    recordData.append("test_date", test_date);
    recordData.append("details", details);
    recordData.append("image", image);

    this.http.post<{ message: string, record: InspectModel }>(
       BACKEND_URL + 'quick_test/',
       recordData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/success"]);
      });
  }

  addAdvTestRecord(userId: string, appId: string,
    test_date: string, details: string, image: File) {

    const recordData = new FormData();
    recordData.append("userId", userId);
    recordData.append("appId", appId);
    recordData.append("test_date", test_date);
    recordData.append("details", details);
    recordData.append("image", image);

    this.http.post<{ record: FastAPIModel }>(
      'http://localhost:8000/upload_image/',
      recordData
     )
     .subscribe((responseData) => {
        console.log("Response from FASTAPI", responseData);
        recordData.append("EfficientNetB7", responseData[0].EfficientNetB7);
        recordData.append("VGG19", responseData[0].VGG19);
        recordData.append("Inceptionv3", responseData[0].Inceptionv3);
        recordData.append("Xception", responseData[0].Xception);
        recordData.append("ResNet50", responseData[0].ResNet50);
        recordData.append("MobileNetV3", responseData[0].MobileNetV3);

        this.http.post<{ message: string, record: any }>(
          BACKEND_URL + 'adv_test/',
          recordData
        )
        .subscribe((resData) => {
          this.router.navigate(["/success"]);
        });
    });
  }

  updateRecord(id: string, patient: string, details: string, image: File) {
    let recordData: InspectModel | FormData;
    if (typeof(image) === 'object') {
      recordData = new FormData();
      recordData.append('id', id);
      recordData.append('patient', patient);
      recordData.append('details', details);
      recordData.append('image', image, patient);
    }
    this.http
      .put(BACKEND_URL + id, recordData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteRecord(recordId: string) {
    return this.http.delete(BACKEND_URL + recordId);
  }
}
