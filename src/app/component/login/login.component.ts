import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  /**
   *
   */
    isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router, 
    private toast: ToastrService, 
    private loginService: LoginService
  ) {
    
  }
  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
      this.route.navigate(['/admin']);
  }

  submitted = false;
  loginForm = this.formBuilder.group({
    contactNo: ['', Validators.required],
    password: ['', Validators.required]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  onSubmit(){
    this.isLoading = true;
    this.submitted = true;
    if(this.loginForm.invalid){
      this.isLoading = false;
      return
    }else{
      this.loginService.login(this.loginForm.value).subscribe(
        res => {
          
          if(res.name == 'blog' && res.succeed){
            localStorage.setItem('token', res.token);
            this.toast.success('Login!', 'Login Success');
            this.route.navigate(['/blog']);
          }else if(res.name != 'blog' && res.succeed){
            localStorage.setItem('token', res.token);
            localStorage.setItem('isClientUser', res.isClientUser);
            this.toast.success('Login!', 'Login Success');
            this.route.navigate(['/admin']);
          }else{
            this.toast.error('Wrong!', res.errors[0]);
            this.isLoading = false;
          }

        },
        err => {          
          this.toast.error('Wrong!', err.error.message);
          this.isLoading = false;
        }
      )
    }


  }
}
