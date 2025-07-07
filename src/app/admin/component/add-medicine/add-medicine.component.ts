import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {

  submitted = false;
  cities: any;
  isLoading = false;
  /**
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private configurationService: ConfigurationService
  ) {

  }

  saveItemForm = this.formBuilder.group({
    manufacturer: ['', Validators.required],
    brandName: ['', Validators.required],
    manufactureId: [0, Validators.required]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.saveItemForm.controls;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    this.configurationService.GetSupplierByNameForInsertMedicine(currentValue).subscribe(respons => {
      this.cities = respons;
    })
  }

  selectedValue(med: any) {    
    this.saveItemForm.patchValue({ "manufacturer": med.name })
    this.saveItemForm.patchValue({ "manufactureId": med.id })
  }

  onSubmit() {
    console.log(JSON.stringify(this.saveItemForm.value))
    this.submitted = true;
    this.isLoading = true;
    if (this.saveItemForm.invalid) {
      this.isLoading = false;
      return;
    } else {
      
      this.configurationService.AddMedicine(this.saveItemForm.value).subscribe(
        res => {
          if (res.succeed) {
            this.toast.success('SUCCESS', 'Item Save Success');
            this.router.navigate(['/admin/item-list']);
          } else {
            this.toast.error('Wrong!', res.errors[0]);
          }
        },
        err => {
          this.toast.error('Wrong!', err.errors[0]);
        }
      )

    }
  }
}
