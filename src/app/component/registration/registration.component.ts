import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { LoginService } from 'src/app/Service/login/login.service';
import Validation from 'src/app/Utils/validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  /**
   *
   */
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: Toast, private loginService: LoginService) {
    
  }

  saveUserForm = this.formBuilder.group({
    idUser: [0],
    txFirstName: ['', Validators.required],
    txLastName: ['', Validators.required],
    txEmail: ['', [Validators.required, Validators.email]],
    txMobileNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    txGender: ['', Validators.required],
    txPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    txConfirmationPassword: ['', Validators.required],
    txIdentity: ['', Validators.required],
    txDescription: ['', Validators.required],
    dttDob: ['', Validators.required],
    isActive:[0]
  }, {
    validators:[Validation.match('txPassword', 'txConfirmationPassword')]
  })


}
