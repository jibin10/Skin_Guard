import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { LabTestRecord } from "../lab-test.model";
import { LabTestService } from "../lab-test.service";


@Component({
  selector: "app-lab-list",
  templateUrl: "./lab-test-list.component.html",
  styleUrls: ["./lab-test-list.component.css"]
})
export class LabTestListComponent implements OnInit, OnDestroy {

  logo = 'assets/images/logo_sm.png';
  dialog_result: string = '';
  patient_records: LabTestRecord[] = [];
  adv_test_Columns: string[] = ['TestDate', 'Details', 'imagePath', 'LabResult', 'Update' ];

  isLoading = false;
  totalRecords = 0;
  prPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];
  userIsAuthenticated = false;
  panelOpenState = false;
  userId: string;
  private prSub: Subscription = new Subscription;
  private authStatusSub = new Subscription;
  private patientId: string;

  constructor(public prService: LabTestService,
    public route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.prService.getPRs(this.prPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.prSub = this.prService.getPRUpdateListener()
    .subscribe((prData: {patient_records: LabTestRecord[], prCount: number}) => {
      this.isLoading = false;
      this.patient_records = prData.patient_records;
      this.totalRecords = prData.prCount;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('patientId')) {
          this.patient_records = this.filterPR(prData.patient_records, paramMap.get('patientId'));
          this.totalRecords = this.patient_records.length;
        }
      });
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.prPerPage = pageData.pageSize;
    this.prService.getPRs(this.prPerPage, this.currentPage);
  }

  filterPR(prData: LabTestRecord[], patient: string) {
    var finalData = new Array();
    for(let index in prData) {
      if(prData[index].id == patient) {
        finalData.push(prData[index]);
      }
    }
    return finalData;
  }

  ngOnDestroy() {
    this.prSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
