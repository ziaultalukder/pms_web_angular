import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../service/sales/sales.service';
import { SalesDetails } from '../../models/SalesDetails';
import { SalesInfo } from '../../models/SalesInfo';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements AfterViewInit {

  cities: any;
  SaledDetailsList: SalesDetails[] = [];
  total: number = 0;
  discount: number = 0;
  discountTaka: number = 0;
  grandTotal: number = 0;
  currentValue: number;
  qtyCurrentValue: number;
  vat: number = 0;
  isLoading = false;
  /**
   *
   */
  constructor(
    private salesService: SalesService,
    private toast: ToastrService,
    private route: Router,
    private formBuilder: FormBuilder) {
  }
  ngAfterViewInit(): void {
    this.myInput.nativeElement.querySelector('input').focus();
  }

  @ViewChild('NewQty', { read: ElementRef }) NewQty: ElementRef;
  @ViewChild('testInput', { read: ElementRef }) myInput: ElementRef;
  @ViewChild('dst', { read: ElementRef }) dst: ElementRef;

  salesForm = this.formBuilder.group({
    search: [],
    sl: 0,
    brandName: [],
    manufacturerName: [],
    salesPrice: [],
    purchasePrice: 0,
    quantity: [],
    totalPrice: [],
    newQuantity: []
  })

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    this.salesService.GetClientWiseMedicineForsale(currentValue).subscribe(respons => {
      this.cities = respons;
    })
  }

  selectedValue(med: any) {
    this.salesForm.patchValue({ "brandName": med.brandName })
    this.salesForm.patchValue({ "manufacturerName": med.manufacturerName })
    this.salesForm.patchValue({ "salesPrice": med.salesPrice })
    this.salesForm.patchValue({ "purchasePrice": med.purchasePrice })
    this.salesForm.patchValue({ "quantity": med.quantity })
    this.salesForm.patchValue({ "sl": med.sl })
    this.NewQty.nativeElement.focus();
  }

  AddSalesInfo(data: any): void {

    if (data.search == null) {
      this.toast.error('Error', 'Medicine name is empty')
      this.myInput.nativeElement.querySelector('input').focus();
      return;
    } else if (data.newQuantity == null) {
      this.toast.error('Error', 'Quantity is empty')
      this.NewQty.nativeElement.focus();
      return;
    }
    if(data.quantity == 0){
      this.toast.error('Error', 'Decrese your quantity')

      return;
    }
    if (data.quantity < data.newQuantity) {
      this.toast.error('Error', 'Decrese your quantity')

      return;
    }

    const exist = this.SaledDetailsList.find((c: any) => c.medicineId === data.sl);
    if (exist) {

      exist.totalTaka = exist.salesPrice * (exist.quantity + data.newQuantity);
      exist.subTotal = exist.salesPrice * (exist.quantity + data.newQuantity);
      exist.quantity += data.newQuantity;
      this.total = this.SaledDetailsList.reduce((a: number, b: any) => a + +b.subTotal, 0)

      this.grandTotal = this.total;

    } else {
      let salesDetails: SalesDetails = {
        id: 0,
        medicineId: data.sl,
        salesPrice: data.salesPrice,
        existingQuantity: data.quantity,
        quantity: data.newQuantity,
        totalTaka: (data.newQuantity * data.salesPrice),
        discountPercentage: 0,
        discountTaka: 0,
        subTotal: (data.newQuantity * data.salesPrice),
        grandTotal: (data.newQuantity * data.salesPrice),
        brandName: data.brandName,
        pruchasePrice: data.pruchasePrice
      }
      this.SaledDetailsList.push(salesDetails);
      this.total = this.SaledDetailsList.reduce((a: number, b: any) => a + +b.subTotal, 0)
      this.grandTotal = this.total;
    }

    this.salesForm.reset();
    this.myInput.nativeElement.querySelector('input').focus();
  }

  removeItem(i: number) {
    this.SaledDetailsList.splice(i, 1);
    this.total = this.SaledDetailsList.reduce((a: number, b: any) => a + +b.subTotal, 0)

    this.grandTotal = this.total;
  }

  onInputQuantity(event: Event, indexNo: number, salesPrice: number, availableQty: number, indx: number): void {
    const inputElement = event.target as HTMLInputElement;
    this.qtyCurrentValue = isNaN(parseInt(inputElement.value)) ? 0 : parseInt(inputElement.value);

    if (this.qtyCurrentValue < 0) {
      this.qtyCurrentValue = 0;
    }

    const exist = this.SaledDetailsList.find((c: any) => c.medicineId === indexNo);

    if (exist) {

      if (this.qtyCurrentValue == 0) {
        exist.discountTaka = 0;
      }

      if (this.qtyCurrentValue > availableQty) {
        this.toast.error('Error', 'Sales Quantity is greater than Stock Qty')
        // this.qtyCurrentValue = availableQty;
        // exist.subTotal = exist.salesPrice * this.qtyCurrentValue;
        // exist.totalTaka = exist.salesPrice * this.qtyCurrentValue;
        // exist.quantity = availableQty;
        // this.total = this.SaledDetailsList.reduce((a: number, b: any) => a + +b.subTotal, 0)
        // this.grandTotal = this.total;
        this.SaledDetailsList.splice(indx, 1);
        this.total = this.SaledDetailsList.reduce((a: number, b: any) => a + +b.subTotal, 0)

        this.grandTotal = this.total;

      } else {
        exist.subTotal = exist.salesPrice * this.qtyCurrentValue;
        exist.totalTaka = exist.salesPrice * this.qtyCurrentValue;
        this.total = this.SaledDetailsList.reduce((a: number, b: any) => a + +b.subTotal, 0)
        this.grandTotal = this.total;
      }
    }
  }

  discountCalculation(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    this.currentValue = isNaN(parseInt(inputElement.value)) ? 0 : parseInt(inputElement.value);

    if (this.currentValue < 0) {
      this.currentValue = 0;
    }
    if (this.currentValue > 100) {
      this.grandTotal = 0;
      this.discountTaka = 0;
    } else {
      this.discount = this.currentValue;
      const result = (this.total * this.currentValue) / 100;
      this.discountTaka = result;
      this.grandTotal = this.total - result;
    }
  }

  SaveSalesInfo() {
    this.isLoading = true;
    let salesInfo: SalesInfo = {
      id: 0,
      customerName: '',
      contactNo: '',
      totalTaka: this.total,
      discountPercentage: this.currentValue,
      discountTaka: this.discountTaka,
      subTotal: this.total,
      grandTotal: this.grandTotal,
      salesDetails: this.SaledDetailsList
    }

    console.log(salesInfo);
    this.salesService.InsertSalesInfo(salesInfo).subscribe(
      option => {
        if (option.succeed) {
          this.toast.success('Sales!', 'sales success');
          this.salesForm.reset();
          this.SaledDetailsList = []
          this.myInput.nativeElement.querySelector('input').focus();
          this.total = 0;
          this.dst.nativeElement.value = 0;
          this.discount = 0;
          this.discountTaka = 0;
          this.grandTotal = 0;
          this.isLoading = false;
          // this.route.navigate(['/admin/sales-list']);
        } else {
          this.toast.error('Wrong!', option.errors[0]);
          this.isLoading = false;
        }
      })
  }
}
