import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  animate,
  transition,
  style
} from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('toggle', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('500ms ease-in-out')),
      transition(':leave', animate('500ms ease-in-out'))
    ])]

})
export class BlogComponent {

  constructor(private route: Router) {

  }

  expan = true;

  navBerData = [
    { name: 'Client', link: 'client', permission: 2 },
    { name: 'Post', link: 'post', permission: 2 },
    { name: 'New Post', link: 'new-post', permission: 2 },
    { name: 'Category', link: 'category', permission: 2 }
  ]

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
  showHide() {
    this.expan = !this.expan;
  }
}
