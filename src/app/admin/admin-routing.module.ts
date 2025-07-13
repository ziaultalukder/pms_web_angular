import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ClientComponent } from './component/client/client.component';
import { MedicineComponent } from './component/medicine/medicine.component';
import { StockComponent } from './component/stock/stock.component';
import { SalesComponent } from './component/sales/sales.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import { StockListComponent } from './component/stock-list/stock-list.component';
import { RefundListComponent } from './component/refund-list/refund-list.component';
import { RefundDetailsComponent } from './component/refund-details/refund-details.component';
import { ReportComponent } from './component/report/report.component';
import { SalesDetailsComponent } from './component/sales-details/sales-details.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { AddMedicineComponent } from './component/add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './component/update-medicine/update-medicine.component';
import { SupplierListComponent } from './component/supplier-list/supplier-list.component';
import { AddSupplierComponent } from './component/add-supplier/add-supplier.component';
import { StockRefundComponent } from './component/stock-refund/stock-refund.component';
import { StockDetailsComponent } from './component/stock-details/stock-details.component';
import { UpdateSupplierComponent } from './component/update-supplier/update-supplier.component';

const routes: Routes = [
  {path: '', component:AdminComponent, 
    children:[
      {path: 'dashboard', component: DashboardComponent},
      {path: 'user-registration', component: UserRegistrationComponent},
      {path: 'client', component: ClientComponent},
      {path: 'supplier-list', component: SupplierListComponent},
      {path: 'add-supplier', component: AddSupplierComponent},
      {path: 'medicine', component: MedicineComponent},
      {path: 'stock', component: StockComponent},
      {path: 'sales', component: SalesComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'sales-list', component: SalesListComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'stock-list', component: StockListComponent},
      {path: 'refund-list', component: RefundListComponent},
      {path: 'stock-refund', component: StockRefundComponent},
      {path: 'item-list', component: ItemListComponent},
      {path: 'add-medicine', component: AddMedicineComponent},
      {path: 'update-medicine/:id', component: UpdateMedicineComponent},
      {path: 'update-supplier/:id', component: UpdateSupplierComponent},
      {path: 'refund-details', component: RefundDetailsComponent},
      {path: 'sales-details/:id', component:SalesDetailsComponent},
      {path: 'stock-details/:id', component:StockDetailsComponent},
      {path: 'reports', component: ReportComponent},
      {path: '', redirectTo:'/admin/dashboard', pathMatch:'full'},
      {path: '**', component:NotFoundComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
