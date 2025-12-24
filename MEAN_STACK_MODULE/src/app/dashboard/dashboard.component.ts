import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading = false;
  role: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getRole();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {

  }
}
