import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '../../service/sales/sales.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})

export class SalesListComponent implements OnInit {
  
  /**
   *
   */

  startDate=this.formatDate(new Date())
  endDate= this.formatDate(new Date())
  salesList: any;
  formModal: any;


  constructor(private salesService: SalesService, private formBuilder: FormBuilder, private route: Router) {
  }

  ngOnInit(): void {
    
    this.salesListForm.controls.startDate.setValue(this.formatDate(new Date()));
    this.salesListForm.controls.endDate.setValue(this.formatDate(new Date()));    
    this.salesService.getSales(this.startDate, this.endDate).subscribe(c=> {
      this.salesList = c;
    })

  }

  salesListForm = this.formBuilder.group({
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
    
    this.salesService.getSales(data.startDate, data.endDate).subscribe(c=> {
      this.salesList = c
    })
  }

  NewSales(){
    this.route.navigate(['/admin/sales']);
  }

  viewSalesInDetails(id: number){
    this.route.navigate( ['/admin/sales-details', id])
  }

  openModal(){
    
    this.formModal.show();
  }
}
