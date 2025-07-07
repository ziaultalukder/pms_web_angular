import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { FormBuilder } from '@angular/forms';
import { StockInDetails } from '../../models/StockInDetails';
import { StockInfo } from '../../models/StockInfo';
import { StockService } from '../../service/stock/stock.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit, AfterViewInit {

  cities: any;
  selectedCity: any;
  selectedCar: number;
  MedicineList: any;
  StockInDetailsList: StockInDetails[] = [];
  selected_employee: any;
  showDropDown = false;
  total: number = 0;
  discount: number = 0;
  discountTaka: number = 0;
  grandTotal: number = 0;
  p: string;
  qt: any
  currentValue: number;
  qtyCurrentValue: number;
  isLoading = false;
  @ViewChild("testInput1") testInput1: any;
  @ViewChild("NewQty") NewQty: any;
  @ViewChild('testInput', { read: ElementRef }) myInput: ElementRef;

  /**
   *
   */
  constructor(
    private configurationService: ConfigurationService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private route: Router,
    private stockService: StockService) {
  }

  ngOnInit(): void {
    this.stockForm.controls.stockDate.setValue(this.formatDate(new Date()));
  }
  ngAfterViewInit() {
    this.myInput.nativeElement.querySelector('input').focus();
  }

  stockForm = this.formBuilder.group({
    search: [],
    brandName: [],
    manufacturerName: [],
    salesPrice: [],
    purchasePrice: [],
    quantity: [],
    TotalPrice: [],
    NewQuantity: 0,
    sl: 0,
    stockDate: ['']
  })

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    if (currentValue.length > 2) {
      this.configurationService.MedicineListByName(currentValue).subscribe(respons => {
        this.cities = respons;
      })
    }
  }

  selectedValue(med: any) {
    this.stockForm.patchValue({ "brandName": med.brandName })
    this.stockForm.patchValue({ "manufacturerName": med.manufacturerName })
    this.stockForm.patchValue({ "salesPrice": med.salesPrice })
    this.stockForm.patchValue({ "purchasePrice": med.purchasePrice })
    this.stockForm.patchValue({ "quantity": med.quantity })
    this.stockForm.patchValue({ "NewQuantity": 0 })
    this.stockForm.patchValue({ "sl": med.sl })

    this.MedicineList = [];
    this.showDropDown = false;
    if (med.salesPrice > 0) {
      this.NewQty.nativeElement.focus();
    } else {
      this.testInput1.nativeElement.focus();
    }
  }

  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
  }

  AddStockQty(data: any) {

    if(data.search == null){
      this.toast.error('Wrong!', 'Medicine name empty');
      return;
    }
    if (data.salesPrice < data.purchasePrice) {
      this.toast.error('Wrong!', 'purchase price must be less than sales price');
      return;
    }
    this.qt = this.stockForm.controls['NewQuantity']?.value;
    if (data.salesPrice <= 0) {
      this.toast.error('Wrong!', 'Sales Price Is Zero');
      return;
    } else if (data.purchasePrice <= 0) {
      this.toast.error('Wrong!', 'Purchase Price Is Zero');
      return;
    } else if (this.qt <= 0) {
      this.toast.error('Wrong!', 'Qty Is Zero');
      return;
    }else if(data.purchasePrice == data.salesPrice){
      this.toast.error('Wrong!', 'sales and purchase price is same !');
      return;
    }

    const exist = this.StockInDetailsList.find((c: any) => c.medicineId === data.sl);
    if (exist) {

      exist.totalPrice = exist.salesPrice * (exist.newQty + data.NewQuantity);
      exist.newQty = exist.newQty + data.NewQuantity;
      this.total = this.StockInDetailsList.reduce((a: number, b: any) => a + +b.salesPrice * b.newQty, 0)

      this.grandTotal = this.total;

    } else {
      var stockInDetails: StockInDetails = {
        id: 0,
        medicineId: data.sl,
        newQty: data.NewQuantity,
        existingPrice: 0,
        salesPrice: data.salesPrice,
        pruchasePrice: data.purchasePrice,
        totalPrice: (data.salesPrice * data.NewQuantity),
        brandName: data.brandName
      }
      this.StockInDetailsList.push(stockInDetails)
      this.total = this.StockInDetailsList.reduce((a: number, b: any) => a + +b.salesPrice * b.newQty, 0)
      this.grandTotal = this.total;
    }

    this.stockForm.reset();
    this.stockForm.controls.stockDate.setValue(this.formatDate(new Date()));
    this.myInput.nativeElement.querySelector('input').focus();
  }

  removeItem(i: number) {
    this.StockInDetailsList.splice(i, 1);
    this.total = this.StockInDetailsList.reduce((a: number, b: any) => a + +b.salesPrice * b.newQty, 0)
    this.grandTotal = this.total;
    this.discountTaka = 0;
  }

  onInputQuantity(event: Event, indexNo: number, salesPrice: number): void {
    const inputElement = event.target as HTMLInputElement;
    this.qtyCurrentValue = isNaN(parseInt(inputElement.value)) ? 0 : parseInt(inputElement.value);
    if (this.qtyCurrentValue < 0) {
      this.qtyCurrentValue = 0;
    }
    const exist = this.StockInDetailsList.find((c: any) => c.medicineId === indexNo);
    if (exist) {
      exist.totalPrice = exist.salesPrice * this.qtyCurrentValue;
      exist.newQty = this.qtyCurrentValue;
      this.total = this.StockInDetailsList.reduce((a: number, b: any) => a + +b.salesPrice * b.newQty, 0)
      this.grandTotal = this.total;
      this.discountTaka = 0;
    }
  }

  onInputDiscount(event: Event): void {
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

  SaveStockInfo() {
    this.isLoading = true;
    let stockIn: StockInfo = {
      id: 0,
      stockDate: this.stockForm.get('stockDate')?.value as string,
      supplierId: 1,
      totalPrice: this.total,
      discountPercentage: this.discount,
      discountTaka: 0,
      discountValue: this.discountTaka,
      isActive: 'Y',
      grandTotal: this.grandTotal,
      stockInDetails: this.StockInDetailsList,
    }

    this.stockService.newStock(stockIn).subscribe(
      option => {
        if (option.succeed) {
          this.toast.success('Stock!', 'stock success');
          this.route.navigate(['/admin/stock-list']);
        } else {
          this.toast.error('Wrong!', option.errors[0]);
        }
      })

  }

  onInput1(event: Event) {
    // const inputElement = event.target as HTMLInputElement;
    // const currentValue = inputElement.value;
    // if(currentValue.length>1){
    //   this.configuration.MedicineListByNameForWeb(currentValue).subscribe(respons => {
    //     this.MedicineListByNameForWeb = respons;
    //   })
    // }
  }

  getValue(event: Event) {

  }

}
