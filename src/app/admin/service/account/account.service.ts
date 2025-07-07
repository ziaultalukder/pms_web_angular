import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url + "/Accounts";

  UserRegistration(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/UserRegistration', data);
  }

  ChangePassword(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/ChangePassword', data);
  }

  ActiveDeActiveUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/ActiveAndDeActiveUser', data);
  }

}
