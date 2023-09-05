import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface changeStatus {
  id: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  userData: any = new BehaviorSubject({});


  /*   Delete User */
  deleteUser(id: string) {
    return this.http.delete(environment.baseApi.replace('tasks', 'auth') + '/user/' + id)
  }

  /*   Change User status */
  changeStatus(model: changeStatus) {
    return this.http.put(environment.baseApi.replace('tasks', 'auth') + '/user-status/', model)
  }

  /*   Get All Users */
  getAllUsers(filter: any) {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        params = params.append(key, value);
      })
    }
    return this.http.get(environment.baseApi.replace('tasks', 'auth') + '/users/', { params })
  }

  /*   Get All Users Data */
  getUsersData(model?: any) {
    this.getAllUsers(model).subscribe((res: any) => {
      this.userData.next({
        data: res.users,
        totalItems: res.totalItems
      })
    })
  }

}