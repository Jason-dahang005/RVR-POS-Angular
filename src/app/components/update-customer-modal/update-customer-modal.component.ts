import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { UpdateCustomers } from '../../models/customer';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';

@Component({
  selector: 'app-update-customer-modal',
  standalone: true,
  imports: [
    MatIconModule,
    LoaderComponent,
    CommonModule,
    ReactiveFormsModule,
    SuccessAlertComponent
  ],
  templateUrl: './update-customer-modal.component.html',
  styleUrl: './update-customer-modal.component.css'
})
export class UpdateCustomerModalComponent implements OnInit {
  @ViewChild('updateCustomerModal') customerModal: ElementRef | undefined 

  customersDetails: UpdateCustomers
  
  customerService = inject(CustomersService)

  updateCustomerForm: FormGroup
  isLoading = false
  updateModalDisplay: boolean = true
  isSuccess: boolean = false
  msg: string = ''

  constructor(private fb: FormBuilder){
    this.updateCustomerForm = this.fb.group({
      type: this.fb.control(''),
      rate: this.fb.control(''),
      description: this.fb.control(''),
    })
  }

  ngOnInit(): void {
  }

  openUpdateCustomerModal = (customer: UpdateCustomers) => {
    if(this.customerModal){
      this.customerModal.nativeElement.style.display = 'flex'
      this.customersDetails = customer
      this.updateCustomerForm.setValue({
        type: this.customersDetails.type,
        rate: this.customersDetails.rate,
        description: this.customersDetails.description
      })
      console.log(customer)
    }
  }

  closeCreateCustomerModal = () => {
    if(this.customerModal){
      this.customerModal.nativeElement.style.display = 'none'
    }
  }

  onUpdateCustomers(){
    if (this.updateCustomerForm.valid) {
      this.isLoading = true
      const updateCustomer = this.updateCustomerForm.value
      updateCustomer.id = this.customersDetails?.id
      this.customerService.updateCustomers(updateCustomer).subscribe({
        next: (res: any) => {
          console.log(res)
          this.customerService.changeCustomer(res)
          this.msg = res.message
          this.isSuccess = true
          setInterval(() => {
            this.isLoading = false
          }, 300);
         setTimeout(() => {
          this.isSuccess = false
         }, 3000);
          this.closeCreateCustomerModal()
        }
      })
    }
  }
}
