import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CreateCustomerModalComponent } from '../../components/create-customer-modal/create-customer-modal.component';
import { CustomersListComponent } from '../../components/customers-list/customers-list.component';
import { SuccessAlertComponent } from '../../components/success-alert/success-alert.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    CreateCustomerModalComponent,
    CustomersListComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

}
