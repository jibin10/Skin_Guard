import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { UsersData } from "../user.model";
import { UsersService } from "../user.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm_dialog/confirm-dialog.component';


@Component({
  selector: "app-User",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"]
})
export class UserListComponent implements OnInit, OnDestroy {
  dialog_result: string = '';
  usersData: UsersData[] = [];
  isLoading = false;
  totalUsers = 0;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];
  userIsAuthenticated = false;
  userId: string;
  role: string;
  private usersSub: Subscription = new Subscription;
  private authStatusSub = new Subscription;

  constructor(public usersService: UsersService, private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.usersService.getOtherUsers(this.usersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();
    this.usersSub = this.usersService.getUserUpdateListener()
    .subscribe((usersData: {users: UsersData[], usersCount: number}) => {
      this.isLoading = false;
      this.usersData = usersData.users;
      this.totalUsers = this.usersData.length;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getRole();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
  }

  confirmDialog(userId: string): void {
    const dialogData = {title: "Delete user", message: "Are you sure you want to delete it?. If you click 'Delete' it is irreversible!."};
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.dialog_result = dialogResult;
      if(this.dialog_result) {
        this.onDelete(userId);
      }
    });
  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.usersService.deleteUser(userId).subscribe(() => {
      this.usersService.getUsers(this.usersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
