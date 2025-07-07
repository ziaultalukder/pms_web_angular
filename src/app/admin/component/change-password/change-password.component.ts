import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/Utils/validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  id: any
  /**
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }

  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', Validators.required, Validators.minLength(6), Validators.maxLength(40)],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    txConfirmationPassword: ['', Validators.required]
  }, {
    validators: [Validation.match('password', 'txConfirmationPassword')]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    
    
    let data = {
      id: 0,
      oldPassword: this.changePasswordForm.get('oldPassword')?.value,
      newPassword:  this.changePasswordForm.get('password')?.value
    }

    console.log(data)
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    } else {      
      
      this.accountService.ChangePassword(data).subscribe(
        res => {
          if (res.succeed) {
            this.toast.success('SUCCESS', 'Password Change Success');
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
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
