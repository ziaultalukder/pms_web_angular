import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent implements OnInit {

  /**
   *
   */
  isLoading = false;
  cities: any
  itemDetails: any
  submitted = false;
  primaryKey: number
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private configurationService: ConfigurationService

  ) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.configurationService.GetSupplierForEdit().subscribe(c => { this.cities = c; })
    this.configurationService.GetUserUploadItemById(id).subscribe(c => {
      this.itemDetails = c;
      for (let i of c) {

        this.primaryKey = c.sl;
        this.saveItemForm.patchValue({ "manufacturer": i.manufacturerName })
        this.saveItemForm.patchValue({ "brandName": i.brandName })
        this.saveItemForm.patchValue({ "manufactureId": i.manufactureId })
        this.saveItemForm.patchValue({ "id": i.sl })
      }

    })
  }

  saveItemForm = this.formBuilder.group({
    id: 0,
    manufactureId: 0,
    manufacturer: ['', Validators.required],
    brandName: ['', Validators.required]
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
    // console.log(JSON.stringify(this.saveItemForm.value))
    this.submitted = true;
    this.isLoading = true;
    if (this.saveItemForm.invalid) {
      this.isLoading = true
      return;
    } else {

      this.configurationService.UpdateMedicine(this.saveItemForm.value).subscribe(
        res => {
          if (res.succeed) {
            this.toast.success('SUCCESS', 'Item Updae Success');
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
