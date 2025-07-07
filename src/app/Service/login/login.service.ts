import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url+"/Accounts";
  private fullUrl = "http://faisalrazzaq479-001-site1.anytempurl.com/api/Accounts/Login";

  login(data: any): Observable<any> {
     return this.http.post<any>(this.url+'/Login', data);
    //return this.http.post<any>(this.fullUrl, data);
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.url+'/Login', null);
  }

  SaveUser(data: any): Observable<any>{
    return this.http.post(this.url+'SaveUser', data);
  }
}
