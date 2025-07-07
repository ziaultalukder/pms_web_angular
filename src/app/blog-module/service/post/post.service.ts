import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url + "/Post";
  public postDetails: any
  GetPost() {
    return this.http.get(this.url + '/GetPost?currentPage=1&itemsPerPage=50');
  }

  CreatePost(data: any) : Observable<any>{
    return this.http.post<any>(this.url+'/CreatePost', data);
  }

  UpdatePost(data: any) : Observable<any>{
    return this.http.post<any>(this.url+'/UpdatePost', data);
  }

  GetPostById(id: number) : Observable<any>{
    return this.http.get<any>(this.url+'/GetPostById?id='+id);
  }

}
