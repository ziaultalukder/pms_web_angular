import { Component } from '@angular/core';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

  /**
   *
   */
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private configurationService: ConfigurationService
  ) {

  }

  supplierForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.supplierForm.controls;
  }

  onSubmit() {
    console.log(JSON.stringify(this.supplierForm.value))
    this.submitted = true;
    if (this.supplierForm.invalid) {
      return;
    } else {
      this.configurationService.AddOrEditSupplier(this.supplierForm.value).subscribe(
        res => {
          if (res.succeed) {
            this.toast.success('SUCCESS', 'Supplier Save Success');
            this.router.navigate(['/admin/supplier-list']);
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
