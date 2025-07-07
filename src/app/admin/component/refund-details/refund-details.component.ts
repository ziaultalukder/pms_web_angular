import { Component } from '@angular/core';
import { SalesService } from '../../service/sales/sales.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder } from '@angular/forms';
import { RefundDetails } from '../../models/RefundDetails';
import { Refund } from '../../models/Refund';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refund-details',
  templateUrl: './refund-details.component.html',
  styleUrls: ['./refund-details.component.css']
})
export class RefundDetailsComponent {

  /**
   *
   */
  cities: any;
  refundDetailsList: Array<RefundDetails> = [];
  isLoading = false;
  constructor(private salesService: SalesService, private toast: ToastrService, private fb: FormBuilder, private route: Router) {

  }

  refundForm = this.fb.group({
    id: 0,
    customerName: '',
    contactNo: [],
    totalTaka: 0,
    discountPercentage: 0,
    discountTaka: 0,
    subTotal: 0,
    grandTotal: 0,
    invoiceNo: '',
    salesDetailsViewModels: new FormArray([
      this.fb.group({
        id: 0,
        medicineId: 0,
        brandName: '',
        salesPrice: 0,
        quantity: 0,
        totalTaka: 0,
        returnqty: 0
      })
    ])
  })

  count: number = 0;
  searchInvoice(event: any) {

    if(event.target.value == ""){
      this.toast.error("ERROR", "Field Must Not Be Empty!")
      return
    }

    this.salesService.GetSalesInfoForRefund(event.target.value).subscribe(c => {
      

      if (c == null) {
        this.toast.error("ERROR", "Invalid Invoice No!")
        this.refundForm.reset()
        this.salesDetails.clear();
      } else {
        
        if (this.count <= 0) {
          this.count++;

          for (var data of c.salesDetailsViewModels) {
            this.salesDetails.push(this.fb.group({
              'id': data.id,
              'medicineId': data.medicineId,
              'brandName': data.brandName,
              'salesPrice': data.salesPrice,
              'quantity': data.quantity,
              'totalTaka': data.totalTaka,
              'returnqty': 0
            }))
          }
          this.refundForm.setValue({
            id: c.id,
            customerName: c.customerName,
            contactNo: c.contactNo,
            totalTaka: c.totalTaka,
            discountPercentage: c.discountPercentage,
            discountTaka: c.discountTaka,
            subTotal: c.subTotal,
            grandTotal: c.grandTotal,
            invoiceNo: c.invoiceNo,
            salesDetailsViewModels: []
          })
          
        }


      }
    })
  }

  get salesDetails() {
    return this.refundForm.get("salesDetailsViewModels") as FormArray;
  }

  selectedValue(date: any) {

  }

  refundQty(data: any, existingQty: any, indexNo: number, salesPrice: any) {

    if (parseInt(existingQty.value) < parseInt(data.value)) {

      this.toast.error('WARNING', 'Error');
      const usersArray = this.refundForm.get('salesDetailsViewModels') as FormArray;
      usersArray.at(indexNo).patchValue({ returnqty: parseInt(existingQty.value) });
      return;
    } else {
      const usersArray = this.refundForm.get('salesDetailsViewModels') as FormArray;
      const availableQty = parseInt(existingQty.value) - parseInt(data.value);
      usersArray.at(indexNo).patchValue({ totalTaka: availableQty * salesPrice.value });


      const totalAge = usersArray.controls.reduce((sum, group) => {
        const age = group.get('totalTaka')?.value || 0;
        return sum + age;
      }, 0);

      this.refundForm.controls["totalTaka"].setValue(totalAge)
      const discount = this.refundForm.get("discountPercentage")?.value;

      const result = (totalAge * discount!) / 100;
      this.refundForm.controls["discountTaka"].setValue(result)
      this.refundForm.controls["grandTotal"].setValue(totalAge - result)
      console.log(totalAge)
    }
  }

  saveRefund(data: any) {
    this.isLoading = true;
    if (data.invoiceNo == "" || data.id == 0) {
      this.toast.error("Worning", "Invoice No Not Found")
      this.isLoading = false;
      return
    }

    for (var i of data.salesDetailsViewModels) {
      if (i.returnqty > 0) {
        let details: RefundDetails = {
          id: i.id,
          medicineId: i.medicineId,
          salesQty: i.quantity - i.returnqty,
          refundQty: i.returnqty,
          totalTaka: i.totalTaka
        }
        this.refundDetailsList.push(details);
      }
    }

    let refund: Refund = {
      id: data.id,
      totalTaka: data.totalTaka,
      discount: data.discountPercentage,
      discountTaka: data.discountTaka,
      grandTotal: data.grandTotal,
      refundDetails: this.refundDetailsList
    }
    this.salesService.InsertSalesRefund(refund).subscribe(c => {
      if (c.succeed) {
        this.toast.success('REFUND', 'Refund Success');
        this.route.navigate(['/admin/medicine']);
      } else {
        this.toast.error('Wrong!', c.errors[0]);
      }
    })
    console.log(refund)
  }

}
