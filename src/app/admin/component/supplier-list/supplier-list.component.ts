import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  /**
   *
   */
  supplierList: any
  constructor( private configurationService: ConfigurationService, private route: Router ) {
    
  }

  ngOnInit(): void {
    this.configurationService.GetSupplier().subscribe(c=>{
      this.supplierList = c;
    })
  }

  AddSupplier(){
    this.route.navigate(['admin/add-supplier'])
  }

  updateSupplier(id: number){
    this.route.navigate(['admin/update-supplier', id])
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    if(currentValue == ""){
      this.ngOnInit();
    }
    this.configurationService.GetSupplierByName(currentValue).subscribe(respons => {
      this.supplierList = respons;
    })

  }

}
