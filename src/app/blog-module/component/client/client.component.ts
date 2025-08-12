import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/admin/service/configuration/configuration.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  
  /**
   *
   */
  clientList: any
  constructor(private configure: ConfigurationService) {
    
  }
  ngOnInit(): void {
    this.configure.GetClient().subscribe(c=> {
      this.clientList = c;
    })
    // throw new Error('Method not implemented.');
  }

}
