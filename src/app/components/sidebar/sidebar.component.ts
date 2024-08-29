import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NavComponent,
    LogoComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
