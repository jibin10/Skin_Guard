import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PerformanceRecord } from "./performance.model";

const BACKEND_URL = environment.apiUrl + '/inspect/';

@Injectable({providedIn: 'root'})
export class PerformanceService {

  private performance: PerformanceRecord[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getAdvModels() {
    console.log("service");
    return this.http.get<{performance: PerformanceRecord[]}>(
      BACKEND_URL + "all_model_results"
    );
  }
}
