import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  /**
   *
   */

  medicneList: any;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  numbers: number[] = [];

  constructor(private configuration: ConfigurationService, private route: Router) { }

  ngOnInit(): void {
    this.getClientWiseMedicine();
  }

  AddStock() {
    this.route.navigate(['admin/stock'])
  }

  onInput(data: any) {
    const inputElement = data.target as HTMLInputElement;
    const currentValue = inputElement.value;

    if (currentValue == "") {
      this.medicneList = null;
      this.getClientWiseMedicine();
    }
    this.configuration.GetClientWiseMedicineByName(currentValue).subscribe(respons => {
      this.medicneList = respons;
    })
  }

  getClientWiseMedicine() {
    this.medicneList = null;
    this.numbers = [];
    this.configuration.GetClientWiseMedicine(this.currentPage, this.itemsPerPage)
      .subscribe(medicine => {
        this.medicneList = medicine.body;
        var token = JSON.parse(medicine.headers.get('Pagination') || '');
        this.currentPage = token.currentPage;
        this.itemsPerPage = token.itemsPerPage;
        this.totalPages = token.totalPages;
        this.totalItems = token.totalItems;
        for (let i = 1; i <= token.totalPages; i++) {
          this.numbers.push(i);
        }
      });
  }


  next() {
    this.currentPage++

     this.configuration.GetClientWiseMedicine(this.currentPage, this.itemsPerPage)
      .subscribe(c => {
        this.medicneList = c.body;
      }
      )
  }

  previous() {
    this.currentPage--
     this.configuration.GetClientWiseMedicine(this.currentPage, this.itemsPerPage)
      .subscribe(c => {
        this.medicneList = c.body;
      }
      )
  }
}
