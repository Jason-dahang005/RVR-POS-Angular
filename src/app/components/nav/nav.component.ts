import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  menus = [
    { title: 'dashboard',     icon: 'dashboard',    link: 'dashboard' },
    { title: 'customers',     icon: 'group',        link: 'customers' },
    { title: 'cottages',      icon: 'cottage',      link: 'cottages' },
    { title: 'entrance',      icon: 'meeting_room', link: 'entrance' },
    { title: 'reservations',  icon: 'book',         link: 'reservations' },
    { title: 'sales',         icon: 'payments',     link: 'sales' }
  ]
}
