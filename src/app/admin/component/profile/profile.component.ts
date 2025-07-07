import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account/account.service';
import { ActiveAndDeActive } from '../../models/ActiveAndDeActive';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  /**
   *
   */
  profile: any
  constructor(private configurationService: ConfigurationService, 
    private route: Router, private accountService: AccountService,
    private toast: ToastrService) {
    
  }

  ngOnInit(): void {
    this.configurationService.GetProfile().subscribe(c=>{
      this.profile = c;
    })
  }

  AddNewUser(){
    this.route.navigate(['/admin/user-registration']);
  }

  // PasswordChange(id: null){
  //   this.route.navigate(['/admin/password-change',id]);
  // }

  ActiveAndDeActive(data: any){
    let activeDeActive: ActiveAndDeActive = {
      id: data.id,
      isActive: data.isActive
    }
    this.accountService.ActiveDeActiveUser(activeDeActive).subscribe(
      res => {
          if(res.succeed){
            this.toast.success('SUCCESS', res.message);
            this.ngOnInit();
            this.route.navigate(['/admin/profile']);
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
