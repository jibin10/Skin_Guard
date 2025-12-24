import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { PatientRecord } from "../patient-record.model";
import { PRService } from "../patient-record.service";


@Component({
  selector: "app-pr-list",
  templateUrl: "./patient-record-list.component.html",
  styleUrls: ["./patient-record-list.component.css"]
})
export class PRListComponent implements OnInit, OnDestroy {

  logo = 'assets/images/logo_sm.png';
  dialog_result: string = '';
  patient_records: PatientRecord[] = [];
  adv_test_Columns: string[] = ['TestDate', 'Details', 'EfficientNetB7', 'VGG19', 'Inceptionv3', 'Xception', 'ResNet50', 'MobileNetV3', 'imagePath'];
  quick_test_Columns: string[] = ['TestDate', 'Details', 'Custom_Model', 'imagePath'];
  lab_Columns: string[] = ['TestDate', 'Details', 'LabResult', 'imagePath'];

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

  constructor(public prService: PRService,
    public route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.prService.getPRs(this.prPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.prSub = this.prService.getPRUpdateListener()
    .subscribe((prData: {patient_records: PatientRecord[], prCount: number}) => {
      this.isLoading = false;
      this.patient_records = prData.patient_records;
      this.totalRecords = prData.prCount;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('patientId')) {
          this.patient_records = this.filterPR(prData.patient_records, paramMap.get('patientId'));
          this.totalRecords = this.patient_records.length;
        }
      });
      console.log("patient_records ", this.patient_records);
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

  filterPR(prData: PatientRecord[], patient: string) {
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
