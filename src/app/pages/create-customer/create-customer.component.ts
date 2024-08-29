import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router, RouterModule } from '@angular/router';
import { TypeInputComponent } from '../../components/type-input/type-input.component';
import { RateInputComponent } from '../../components/rate-input/rate-input.component';
import { DescriptionInputComponent } from '../../components/description-input/description-input.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Customer {
  type: string,
  rate: string,
  description: string
}

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    TypeInputComponent,
    RateInputComponent,
    DescriptionInputComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {

  router = inject(Router)

  navigateBack(){
    this.router.navigateByUrl('customers')
  }

  customer: Customer = {
    type: '',
    rate: '',
    description: ''
  }

  submitForm(form: NgForm){
    if (form.valid) {
      console.log(form.value, this.customer)
    }
  }
}
