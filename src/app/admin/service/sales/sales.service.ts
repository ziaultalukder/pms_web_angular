import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url + "/Sales";

  GetClientWiseMedicineForsale(medicineName: string) {
    return this.http.get(this.url + "/GetClientWiseMedicineForSales?medicineName=" + medicineName);
  }

  InsertSalesInfo(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/NewSales', data);
  }

  getSales(startDate: string, endDate: string) {
    return this.http.get(this.url + '/GetSales?startDate=' + startDate + '&endDate=' + endDate + '&currentPage=0&itemsPerPage=1000 ');
  }

  salesReport(startDate: string, endDate: string) {
    return this.http.get(this.url + '/SalesReport?startDate=' + startDate + '&endDate=' + endDate + '&currentPage=0&itemsPerPage=1000');
  }

  GetSalesInfoForRefund(invoiceNo: string): Observable<any> {
    return this.http.get(this.url + "/GetSalesInfoForRefund?invoiceNo=" + invoiceNo);
  }
  TodayMonthlyAndYearlySalesReport(){
    return this.http.get(this.url + "/TodayMonthlyAndYearlySalesReport");
  }

  WeeklyChartSalesReport(){
    return this.http.get(this.url + "/WeeklyChartSalesReport");
  }

  WeeklyTopSalesMedicineReport(value:number){
    return this.http.get(this.url + "/WeeklyTopSalesMedicineReport?value="+value);
  }

  GetSalesDetailsById(id: any): Observable<any> {
    return this.http.get(this.url + "/GetSalesDetailsById?id=" + id);
  }

  InsertSalesRefund(data: any): Observable<any> {
    return this.http.post(this.url + "/SalesRefund", data);
  }

}
