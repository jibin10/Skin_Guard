import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { InspectModel } from "../inspect-image.model";
import { InspectService } from "../inspect-image.service";

@Component({
  selector: "app-list-results",
  templateUrl: "./list-results.component.html",
  styleUrls: ["./list-results.component.css"]
})
export class ListResultsComponent implements OnInit, OnDestroy {
  records: InspectModel[] = [];
  isLoading = false;
  totalRecords = 0;
  recordsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];
  userIsAuthenticated = false;
  userId: string;
  private recordsSub: Subscription = new Subscription;
  private authStatusSub = new Subscription;

  constructor(public inspectService: InspectService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.inspectService.getRecords(this.recordsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.recordsSub = this.inspectService.getRecordUpdateListener()
    .subscribe((recordData: {records: InspectModel[], recordCount: number}) => {
      this.isLoading = false;
      this.totalRecords = recordData.recordCount;
      this.records = recordData.records;
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
    this.recordsPerPage = pageData.pageSize;
    this.inspectService.getRecords(this.recordsPerPage, this.currentPage);
  }

  onDelete(recordId: string) {
    this.isLoading = true;
    this.inspectService.deleteRecord(recordId).subscribe(() => {
      this.inspectService.getRecords(this.recordsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
