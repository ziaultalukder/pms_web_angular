import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  animate,
  transition,
  style
} from '@angular/animations';
import { Config, Menu } from '../../models';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('toggle', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('500ms ease-in-out')),
      transition(':leave', animate('500ms ease-in-out'))
    ])]
})
export class AdminComponent implements OnInit {
  /**
   *
   */
  options: Config = { multi: false };
  
  menus: Menu[] = [
    { 
      name: 'Medicine List',
      iconClass: 'fa fa-medkit',
      active: false,
      url:'medicine',
      submenu: []
    },
    { 
      name: 'Configuration',
      iconClass: 'fa fa-cog',
      active: false,
      url:'',
      submenu: [
        { name: 'Item List', url: 'item-list' },
        { name: 'Supplier List', url: 'supplier-list' },
        { name: 'Change Password', url: 'change-password' },
        { name: 'Profile', url: 'profile' }
      ]
    },    
    { 
      name: 'Sales Management',
      iconClass: 'fa fa-bar-chart',
      active: false,
      url:'',
      submenu: [
        { name: 'Sales', url: 'sales' },
        { name: 'Sales List', url: 'sales-list' },
        { name: 'Refund', url: 'refund-details' }
      ]
    },
    { 
      name: 'Stock Management',
      iconClass: 'fa fa-shopping-cart',
      active: false,
      url:'',
      submenu: [
        { name: 'Stock', url: 'stock' },
        { name: 'Stock List', url: 'stock-list' },
        { name: 'Refund', url: 'stock-refund' }
      ]
    },
    { 
      name: 'Reports',
      iconClass: 'fa fa-file-image-o',
      active: false,
      url:'reports',
      submenu: []
    },
    { 
      name: 'Logout',
      iconClass: 'fa fa-sign-out',
      active: false,
      url:'logout',
      submenu: []
    }
  ];

  

  config: Config;
  permission: any;
  constructor(private route: Router) {

  }
  ngOnInit(): void {
    this.config = this.mergeConfig(this.options);
    this.permission = localStorage.getItem('isClientUser')
  }


  mergeConfig(options: Config) {
    const config = {
      multi: true
    };
    return { ...config, ...options };
  }

  expan = true;

  navBerData = [
    { name: 'Profile', link: 'profile', permission: 2, IsUser: 0 },
    { name: 'Item List', link: 'item-list', permission: 2, IsUser: 1 },
    { name: 'Supplier List', link: 'supplier-list', permission: 2, IsUser: 1 },
    { name: 'Medicine', link: 'medicine', permission: 2, IsUser: 1 },
    { name: 'Change Password', link: 'change-password', permission: 2, IsUser: 1 },
    { name: 'Stock', link: 'stock', permission: 2, IsUser: 1 },
    { name: 'Stock List', link: 'stock-list', permission: 2, IsUser: 1 },
    { name: 'Sales', link: 'sales', permission: 2, IsUser: 1 },
    { name: 'Sales List', link: 'sales-list', permission: 2, IsUser: 1 },
    { name: 'Sales Refund', link: 'refund-details', permission: 2, IsUser: 1 },
    { name: 'Reports', link: 'reports', permission: 2, IsUser: 1 },
  ]

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
  showHide() {
    this.expan = !this.expan;
  }

  toggle(index: number) {
    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }
    this.menus[index].active = !this.menus[index].active;
  }


  


}
