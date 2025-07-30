import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }
  private readonly url = environment.url + "/Configuration";

  GetClientWiseMedicine(currentPage: number, itemsPerPage: number) : Observable<HttpResponse<any>> {
    return this.http.get(this.url + "/ClientWiseMedicine?getAll=y&currentPage="+currentPage+" &itemsPerPage="+itemsPerPage+" ", {
      observe: 'response'
    });
  }

  GetClientWiseMedicineByName(name: string) {
    return this.http.get(this.url + "/ClientWiseMedicine?medicineName="+name);
  }

  GetSupplier() {
    return this.http.get(this.url + "/GetSupplier?getAll=y&currentPage=0&itemsPerPage=10");
  }
  GetSupplierForEdit() {
    return this.http.get(this.url + "/GetSupplier?getAll=y&isItemEdit=y");
  }

  GetSupplierByName(name: string) {
    return this.http.get(this.url + "/GetSupplier?shopName="+name);
  }

  GetSupplierByNameForInsertMedicine(name: string) {
    return this.http.get(this.url + "/SupplierByName?name="+name);
  }

  GetUserUploadItem() {
    return this.http.get(this.url + "/GetUserUploadItem?getAll=y&currentPage=0&itemsPerPage=10");
  }

  GetUserUploadItemByName(itemName: string) {
    return this.http.get(this.url + "/GetUserUploadItem?itemName=" + itemName + " ");
  }

  MedicineListByName(medicineName: string) {
    return this.http.get(this.url + "/MedicineListByName?name=" + medicineName);
  }

  MedicineListByNameForWeb(name: string) {
    return this.http.get(`${this.url}/MedicineListByNameForWeb?name=` + name);
  }

  GetProfile() {
    return this.http.get(`${this.url}/GetProfile`);
  }

  AddMedicine(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/AddMedicine', data);
  }

  UpdateMedicine(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/UpdateMedicine', data);
  }

  AddOrEditSupplier(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/AddOrEditSupplier', data);
  }

  getSupplierById(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/GetSupplier?id='+id);
  }

  GetUserUploadItemById(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/GetUserUploadItem?id='+id);
  }

}
