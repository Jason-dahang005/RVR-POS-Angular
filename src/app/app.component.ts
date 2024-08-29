import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RVR-POS-Angular';

  // http = inject(HttpClient)

  // constructor(){
  //   this.http.get('http://127.0.0.1:8000/api/display-customers').subscribe((res:any) => {
  //     console.log(res)
  //   })
  // }
}