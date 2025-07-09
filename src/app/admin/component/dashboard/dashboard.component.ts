import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales/sales.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  /**
   *
   */
  TodayMonthlyAndYearlySalesReport: any
  constructor(private salesService: SalesService) {
    
  }

  ngOnInit(): void {
    this.salesService.TodayMonthlyAndYearlySalesReport().subscribe(c=>{
      this.TodayMonthlyAndYearlySalesReport = c;
    })
  }
  
}
