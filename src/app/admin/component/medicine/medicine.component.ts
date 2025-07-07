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
  constructor(private configuration: ConfigurationService, private route: Router) { }

  ngOnInit(): void {
    this.getClientWiseMedicine();
  }

  AddStock() {
    this.route.navigate(['admin/stock'])
  }

  onInput(data: any){
    const inputElement = data.target as HTMLInputElement;
    const currentValue = inputElement.value;

    if(currentValue == ""){
      this.getClientWiseMedicine();
    }
    this.configuration.GetClientWiseMedicineByName(currentValue).subscribe(respons => {
      this.medicneList = respons;
    })
  }

  getClientWiseMedicine() {
    this.configuration.GetClientWiseMedicine()
      .subscribe(medicine => {
        this.medicneList = medicine;
      });
  }
}
