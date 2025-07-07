import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../service/stock/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  /**
   *
   */
  stockDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stockService: StockService
  ) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.stockService.getStockById(id).subscribe(c=>{
      this.stockDetails = c;
      console.log(c);
    })
    
  }

  salesList(){
    this.router.navigate(['admin/stock-list'])
  }

}
