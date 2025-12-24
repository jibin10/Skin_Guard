import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { PerformanceRecord } from "../performance.model";
import { PerformanceService } from "../performance.service";

@Component({
  selector: "app-performance-list",
  templateUrl: "./performance-list.component.html",
  styleUrls: ["./performance-list.component.css"]
})
export class PerfListComponent implements OnInit, OnDestroy {

  logo = 'assets/images/logo_sm.png';
  dialog_result: string = '';
  patient_records: any;

  isLoading = false;
  userIsAuthenticated = false;
  panelOpenState = false;

  userId: string;
  role: string;

  totalTests : number = 0;
  effB7TP : number = 0;
  effB7TN : number = 0;
  effB7FP : number = 0;
  effB7FN : number = 0;

  vggTP : number = 0;
  vggTN : number = 0;
  vggFP : number = 0;
  vggFN : number = 0;

  incepTP : number = 0;
  incepTN : number = 0;
  incepFP : number = 0;
  incepFN : number = 0;

  xcepTP : number = 0;
  xcepTN : number = 0;
  xcepFP : number = 0;
  xcepFN : number = 0;

  resnetTP : number = 0;
  resnetTN : number = 0;
  resnetFP : number = 0;
  resnetFN : number = 0;

  mobiTP : number = 0;
  mobiTN : number = 0;
  mobiFP : number = 0;
  mobiFN : number = 0;

  private authStatusSub = new Subscription;
  private patientId: string;

  constructor(public prService: PerformanceService,
    public route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit() {

    this.isLoading = true;
    this.prService.getAdvModels().subscribe(modelData => {
      this.isLoading = false;
      this.patient_records = modelData;
      this.findPerformance(modelData);
    });

    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getRole();
      });
  }

  /* filterPR(prData: LabTestRecord[], patient: string) {
    var finalData = new Array();
    for(let index in prData) {
      if(prData[index].id == patient) {
        finalData.push(prData[index]);
      }
    }
    return finalData;
  }
 */
  findPerformance(modelData : any) {
    this.totalTests = modelData.length;
    for (let item of modelData){
      if(item.EfficientNetB7 >= 0.50 && item.LabResult == 1) {
        this.effB7TP += 1;
      }
      else if(item.EfficientNetB7 < 0.50 && item.LabResult == 0) {
        this.effB7TN += 1;
      }
      else if(item.EfficientNetB7 >= 0.50 && item.LabResult == 0) {
        this.effB7FP += 1;
      }
      else if(item.EfficientNetB7 < 0.50 && item.LabResult == 1) {
        this.effB7FN += 1;
      }

      if(item.VGG19 >= 0.50 && item.LabResult == 1) {
        this.vggTP += 1;
      }
      else if(item.VGG19 < 0.50 && item.LabResult == 0) {
        this.vggTN += 1;
      }
      else if(item.VGG19 >= 0.50 && item.LabResult == 0) {
        this.vggFP += 1;
      }
      else if(item.VGG19 < 0.50 && item.LabResult == 1) {
        this.vggFN += 1;
      }

      if(item.Inceptionv3 >= 0.50 && item.LabResult == 1) {
        this.incepTP += 1;
      }
      else if(item.Inceptionv3 < 0.50 && item.LabResult == 0) {
        this.incepTN += 1;
      }
      else if(item.Inceptionv3 >= 0.50 && item.LabResult == 0) {
        this.incepFP += 1;
      }
      else if(item.Inceptionv3 < 0.50 && item.LabResult == 1) {
        this.incepFN += 1;
      }

      if(item.Xception >= 0.50 && item.LabResult == 1) {
        this.xcepTP += 1;
      }
      else if(item.Xception < 0.50 && item.LabResult == 0) {
        this.xcepTN += 1;
      }
      else if(item.Xception >= 0.50 && item.LabResult == 0) {
        this.xcepFP += 1;
      }
      else if(item.Xception < 0.50 && item.LabResult == 1) {
        this.xcepFN += 1;
      }

      if(item.ResNet50 >= 0.50 && item.LabResult == 1) {
        this.resnetTP += 1;
      }
      else if(item.ResNet50 < 0.50 && item.LabResult == 0) {
        this.resnetTN += 1;
      }
      else if(item.ResNet50 >= 0.50 && item.LabResult == 0) {
        this.resnetFP += 1;
      }
      else if(item.ResNet50 < 0.50 && item.LabResult == 1) {
        this.resnetFN += 1;
      }

      if(item.MobileNetV3 >= 0.50 && item.LabResult == 1) {
        this.mobiTP += 1;
      }
      else if(item.MobileNetV3 < 0.50 && item.LabResult == 0) {
        this.mobiTN += 1;
      }
      else if(item.MobileNetV3 >= 0.50 && item.LabResult == 0) {
        this.mobiFP += 1;
      }
      else if(item.MobileNetV3 < 0.50 && item.LabResult == 1) {
        this.mobiFN += 1;
      }

    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
