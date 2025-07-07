import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url + "/Category";

  getCategory() {
    return this.http.get(this.url+'/GetCategoryById?categoryTypeId=2');
  }

  
}
