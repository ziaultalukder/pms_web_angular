import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from '../../service/sales/sales.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {

  /**
   *
   */
  salesDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private salesService: SalesService
  ) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.salesService.GetSalesDetailsById(id).subscribe(c=>{
      this.salesDetails = c;
      console.log(c);
    })
    
  }

  salesList(){
    this.router.navigate(['admin/sales-list'])
  }

}
