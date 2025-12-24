import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UsersData } from './user.model';

const BACKEND_URL = environment.apiUrl + '/user/';


@Injectable({providedIn: 'root'})
export class UsersService {
  private usersData: UsersData[] = [];
  private userUpdated = new Subject<{users: UsersData[], usersCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, users: any, maxUsers: number}>(
        BACKEND_URL + queryParams
        )
        .pipe(map((usersData) => {
          return { users: usersData.users.map(user => {
            return {
              id: user._id,
              name: user.name,
              phone: user.phone,
              email: user.email,
              password: user.password,
              role: user.role
            };
          }), maxUsers: usersData.maxUsers};
        }))
        .subscribe((transformedUserData) => {
          this.usersData = transformedUserData.users;
          this.userUpdated.next({
            users: [...this.usersData],
            usersCount: transformedUserData.maxUsers
          });
        });
  }

  getOtherUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, users: any, maxUsers: number}>(
        BACKEND_URL + "/other/" + queryParams
        )
        .pipe(map((usersData) => {
          return { users: usersData.users.map(user => {
            return {
              id: user._id,
              name: user.name,
              phone: user.phone,
              email: user.email,
              password: user.password,
              role: user.role
            };
          }), maxUsers: usersData.maxUsers};
        }))
        .subscribe((transformedUserData) => {
          this.usersData = transformedUserData.users;
          this.userUpdated.next({
            users: [...this.usersData],
            usersCount: transformedUserData.maxUsers
          });
        });
  }

  getUserUpdateListener(){
    return this.userUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{
      _id: string,
      name: string,
      email: string,
      password: string,
      role: string
    }>(BACKEND_URL + id);
  }

  getUserRole(user_id: string) {
    return this.http.get<{
      _id: string,
      name: string,
      role: string
    }>(BACKEND_URL + "user_role/" + user_id);
  }

  createUser(name: string, role: string, phone: string, email: string, password: string) {
    const userData = {name: name, role: role, phone: phone, email: email, password: password };
    this.http.post(BACKEND_URL + "signup", userData)
    .subscribe((responseData) => {
      this.router.navigate(["/user/list"]);
    });
  }

  updateUserRole(id: string, name: string, role: string) {
    let userRoleData: any | FormData;
    userRoleData = {
      id: id,
      name: name,
      role: role
    };
    this.http
      .put(BACKEND_URL + "user_role/" + id, userRoleData)
      .subscribe(response => {
        this.router.navigate(["/user/list"]);
      });
  }

  updatePassword(id: string, password: string) {
    let userPassword: any | FormData;
    userPassword = {
      id: id,
      password: password
    };
    this.http
      .put(BACKEND_URL + "user_password/" + id, userPassword)
      .subscribe(response => {
        this.router.navigate(["/user/list"]);
      });
  }

  deleteUser(userId: string) {
      return this.http.delete(BACKEND_URL + userId);
  }

}
