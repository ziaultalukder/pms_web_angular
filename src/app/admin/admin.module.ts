import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthInterceptor } from '../guards/auth.interceptor';
import { ClientComponent } from './component/client/client.component';
import { MedicineComponent } from './component/medicine/medicine.component';
import { StockComponent } from './component/stock/stock.component';
import { SalesComponent } from './component/sales/sales.component';
import { ReportComponent } from './component/report/report.component';
import { ConfigurationService } from './service/configuration/configuration.service';
import { DropdownFilterForMedicineStockPipe } from './pipe/dropdown-filter-for-medicine-stock.pipe';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { StockService } from './service/stock/stock.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SalesService } from './service/sales/sales.service';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import { StockListComponent } from './component/stock-list/stock-list.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NewUserComponent } from './component/new-user/new-user.component';
import { NgxPrintModule } from 'ngx-print';

import { AccountService } from './service/account/account.service';
import { RefundListComponent } from './component/refund-list/refund-list.component';
import { RefundDetailsComponent } from './component/refund-details/refund-details.component';
import { SalesDetailsComponent } from './component/sales-details/sales-details.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { AddMedicineComponent } from './component/add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './component/update-medicine/update-medicine.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { SupplierListComponent } from './component/supplier-list/supplier-list.component';
import { AddSupplierComponent } from './component/add-supplier/add-supplier.component';
import { StockRefundComponent } from './component/stock-refund/stock-refund.component';
import { StockDetailsComponent } from './component/stock-details/stock-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserRegistrationComponent,
    NotFoundComponent,
    DashboardComponent,
    ClientComponent,
    MedicineComponent,
    StockComponent,
    SalesComponent,
    ReportComponent,
    DropdownFilterForMedicineStockPipe,
    ClickOutsideDirective,
    SalesListComponent,
    StockListComponent,
    ProfileComponent,
    NewUserComponent,
    RefundListComponent,
    RefundDetailsComponent,
    SalesDetailsComponent,
    ChangePasswordComponent,
    AddMedicineComponent,
    UpdateMedicineComponent,
    ItemListComponent,
    SupplierListComponent,
    AddSupplierComponent,
    StockRefundComponent,
    StockDetailsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    NgxPrintModule,
    
  ],
  providers:[
    ConfigurationService, StockService, SalesService,AccountService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}, 
  ]
})
export class AdminModule { }
