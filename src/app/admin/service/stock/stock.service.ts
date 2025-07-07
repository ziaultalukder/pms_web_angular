import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url+"/Stock";

  newStock(data: any): Observable<any> {
    return this.http.post<any>(this.url+'/NewStock', data);
  }

  getStock(startDate: string, endDate:string) {
    return this.http.get(this.url+'/GetStock?startDate='+startDate+'&endDate='+endDate+' ');
  }

  GetStockInfoForRefund(invoiceNo : string) : Observable<any> {
    return this.http.get(this.url + "/GetStockInfoForRefund?invoiceNo=" + invoiceNo);
  }

  stockRefund(data: any): Observable<any> {
    return this.http.post<any>(this.url+'/StockRefund', data);
  }

}

