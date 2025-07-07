import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit{
  
  /**
   *
   */
  startDate=this.formatDate(new Date())
  endDate= this.formatDate(new Date())
  stockList: any;

  constructor(private stockService: StockService, private formBuilder: FormBuilder, private route: Router) {
    
  }
  ngOnInit(): void {
    this.stockListForm.controls.startDate.setValue(this.formatDate(new Date()));
    this.stockListForm.controls.endDate.setValue(this.formatDate(new Date()));    
    this.stockService.getStock(this.startDate, this.endDate).subscribe(c=> {
      this.stockList = c;
    })
  }

  stockListForm = this.formBuilder.group({
    startDate: [''],
    endDate: ['']
  })

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var dst = year+'-'+month+'-'+day;
    
    return [year, month, day].join('-');
  }

  ShowReport(data: any){
    
    this.stockService.getStock(data.startDate, data.endDate).subscribe(c=> {
      this.stockList = c
    })
  }

  NewStock(){
    this.route.navigate(['/admin/stock']);
  }

  viewStockInDetails(id: number){
        this.route.navigate(['/admin/stock-details',id]);
  }

}
