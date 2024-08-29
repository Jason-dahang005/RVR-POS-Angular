import { Component, Input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-alert',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css'
})
export class SuccessAlertComponent {

  @Input() successMsg?: string

}
