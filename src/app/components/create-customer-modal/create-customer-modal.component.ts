import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { CustomersInput, InputResponse } from '../../models/customer';
import { LoaderComponent } from '../loader/loader.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';

@Component({
  selector: 'app-create-customer-modal',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    CommonModule,
    SuccessAlertComponent
  ],
  templateUrl: './create-customer-modal.component.html',
  styleUrl: './create-customer-modal.component.css'
})
export class CreateCustomerModalComponent {
  @ViewChild('customerModal') customerModal: ElementRef | undefined

  modalDisplay: boolean = true
  customerForm: FormGroup
  isLoading = false
  isFormSubmitted = false
  errorMessage: any
  isSuccess: boolean = false
  msg: string = ''

  customerService = inject(CustomersService)

  openModal = () => {
    if(this.customerModal){
      this.customerModal.nativeElement.style.display = 'flex'
    }
  }

  closeModal = () => {
    if(this.customerModal){
      this.customerModal.nativeElement.style.display = 'none'
      this.customerForm.reset()
    }
  }

  constructor(){
    this.errorMessage = {}
    this.customerForm = new FormGroup({
      type: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)

    })
  }

  onSubmitCustomers(){
    this.isLoading = true
    this.customerService.createNewCustomers(this.customerForm.value).subscribe({
      next: (res: InputResponse) => {
        this.isFormSubmitted = true
        console.log(res)

        this.customerService.changeCustomer(res)
        setInterval(() => {
          this.isLoading = false
        }, 3000);
        this.closeModal()
        this.isSuccess = true
        setTimeout(() => {  
          this.isSuccess = false
        }, 3000)
        
        this.msg = res.message
        this.customerForm.reset()
      }, error: (err: HttpErrorResponse) => {
        this.isLoading = false
        const apiErrors = err.error.errors
        this.displayError(apiErrors)
      }
    }) 
  }

  displayError(apiErrors: any) {
    this.errorMessage = {};
  
    for (const fieldName in apiErrors) {
      if (apiErrors.hasOwnProperty(fieldName)) {
        this.errorMessage[fieldName] = apiErrors[fieldName];
      }
    }
  }
  

}
