import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.css"]
})
export class SuccessComponent implements OnInit, OnDestroy {
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
