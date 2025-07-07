import { Component } from '@angular/core';
import { StockRefundDetails } from '../../models/StockRefundDetails';
import { StockService } from '../../service/stock/stock.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-refund',
  templateUrl: './stock-refund.component.html',
  styleUrls: ['./stock-refund.component.css']
})
export class StockRefundComponent {

  /**
   *
   */

  cities: any;
  refundDetailsList: Array<StockRefundDetails> = [];
  isLoading = false;
  TotlTaka: number;

  constructor(private stockService: StockService, private toast: ToastrService, private fb: FormBuilder, private route: Router) {

  }

  refundForm = this.fb.group({
    id: 0,
    totalTaka: 0,
    discountPercentage: 0,
    discountTaka: 0,
    grandTotal: 0,
    stockDetailsViewModels: new FormArray([
      this.fb.group({
        id: 0,
        medicineId: 0,
        brandName: '',
        quantity: 0,
        returnqty: 0,
        salesPrice: 0,
        totalSalesPrice: 0
      })
    ])
  })

  get stockDetails() {
    return this.refundForm.get("stockDetailsViewModels") as FormArray;
  }

  count: number = 0;

  searchInvoice(event: any) {
    if (event.target.value == "") {
      this.toast.error("ERROR", "Field Must Not Be Empty!")
      return
    }

    this.stockService.GetStockInfoForRefund(event.target.value).subscribe(c => {


      if (c == null) {
        this.toast.error("ERROR", "Invalid Invoice No!")
        this.refundForm.reset()
        this.stockDetails.clear();
      } else {

        if (this.count <= 0) {
          this.count++;

          for (var data of c.stockDetailsViewModels) {
            this.stockDetails.push(this.fb.group({
              'id': data.id,
              'medicineId': data.medicineId,
              'brandName': data.brandName,
              'quantity': data.newQty,
              'returnqty': 0,
              'salesPrice': data.salesPrice,
              'totalSalesPrice': (data.salesPrice * data.newQty),
            }))
          }
          this.refundForm.setValue({
            id: c.id,
            totalTaka: c.totalPrice,
            discountPercentage: c.discountPercentage,
            discountTaka: c.discountValue,
            grandTotal: c.grandTotal,
            stockDetailsViewModels: []
          })

        }

        console.log(this.refundForm)
      }
    })
  }

  refundQty(data: any, existingQty: any, indexNo: number, salesPrice: any) {

    if (parseInt(existingQty.value) < parseInt(data.value)) {

      this.toast.error('WARNING', 'Error');
      const usersArray = this.refundForm.get('stockDetailsViewModels') as FormArray;
      usersArray.at(indexNo).patchValue({ returnqty: parseInt(existingQty.value) });
      return;
    } else {
      const usersArray = this.refundForm.get('stockDetailsViewModels') as FormArray;
      const availableQty = parseInt(existingQty.value) - parseInt(data.value);
      usersArray.at(indexNo).patchValue({ totalSalesPrice: availableQty * salesPrice.value });

      const totalAge = usersArray.controls.reduce((sum, group) => {
        const age = group.get('totalSalesPrice')?.value || 0;
        return sum + age;
      }, 0);

      
      this.refundForm.controls["totalTaka"].setValue(totalAge)
      const discount = this.refundForm.get("discountPercentage")?.value;

      const result = (totalAge * discount!) / 100;
      this.refundForm.controls["discountTaka"].setValue(result)
      this.refundForm.controls["grandTotal"].setValue(totalAge - result)
    }
  }

  saveRefund(data: any) {
    this.isLoading = true;
    if (data.invoiceNo == "" || data.id == 0) {
      this.toast.error("Worning", "Invoice No Not Found")
      this.isLoading = false;
      return
    }

    for (var i of data.stockDetailsViewModels) {
      if (i.returnqty > 0) {
        let details: StockRefundDetails = {
          id: i.id,
          medicineId: i.medicineId,
          existingQty: i.quantity - i.returnqty,
          refundQty: i.returnqty
        }
        this.refundDetailsList.push(details);
      }
    }

    var refund = {
      id: data.id,
      totalTaka: data.totalTaka,
      discount: data.discountPercentage,
      discountTaka: data.discountTaka,
      grandTotal: data.grandTotal,
      refundDetails: this.refundDetailsList
    }

    this.stockService.stockRefund(refund).subscribe(c => {
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
