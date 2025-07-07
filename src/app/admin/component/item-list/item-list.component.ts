import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  /**
   *
   */
  itemList: any
  isLoading = false;
  constructor(private configurationService: ConfigurationService, private route: Router,) {

  }
  ngOnInit(): void {
    this.configurationService.GetUserUploadItem().subscribe(c => {
      this.itemList = c;
    })
  }

  updateProduct(id: number) {
    this.isLoading = true;
    this.route.navigate(['admin/update-medicine', id])
  }

  AddProduct() {
    this.isLoading = true;
    this.route.navigate(['admin/add-medicine'])
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    if(currentValue == ""){
      this.ngOnInit();
    }
    this.configurationService.GetUserUploadItemByName(currentValue).subscribe(respons => {
      this.itemList = respons;
    })

  }

}
