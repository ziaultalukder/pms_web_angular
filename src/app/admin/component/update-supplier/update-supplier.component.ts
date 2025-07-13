import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from '../../service/configuration/configuration.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit{

  submitted = false;
  supplier:any
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
    this.configurationService.getSupplierById(id).subscribe(optopn=>{
      for(let data of optopn){
        this.supplierForm.patchValue({ "name": data.name })
        this.supplierForm.patchValue({ "id": data.id })
      }
    })
  }

  supplierForm = this.formBuilder.group({
    id: 0,
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
            this.toast.success('SUCCESS', 'Supplier Update Success');
            this.router.navigate(['/admin/supplier-list']);
          } else {
            this.toast.error('Wrong!', res.errors[0]);
            this.submitted = false;
          }
        },
        err => {
          this.toast.error('Wrong!', err.errors[0]);
          this.submitted = false;
        }
      )
    }
  }

}
