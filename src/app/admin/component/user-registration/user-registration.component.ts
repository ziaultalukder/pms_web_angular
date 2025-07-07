import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/Utils/validation';
import { AccountService } from '../../service/account/account.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private toast: ToastrService, 
    private accountService: AccountService) {
    
  }

  saveUserForm = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    clientId: [0],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    txConfirmationPassword: ['', Validators.required],
    roleId: 0,
    isActive:['Y'],
    status:['Y'],
  }, {
    validators:[Validation.match('password', 'txConfirmationPassword')]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.saveUserForm.controls;
  }


  onSubmit(): void {
    
    console.log(JSON.stringify(this.saveUserForm.value))
    this.submitted = true;
    if (this.saveUserForm.invalid) {
      return;
    }else{      
      this.accountService.UserRegistration(this.saveUserForm.value).subscribe(
        res => {
          if(res.succeed){
            this.toast.success('SUCCESS', 'User Save Success');
            this.router.navigate(['/admin/profile']);
          }else{
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
