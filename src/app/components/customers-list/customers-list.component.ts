import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomersService } from '../../services/customers.service';
import { Customers, ResponseCustomers } from '../../models/customer';
import { LoaderComponent } from '../loader/loader.component';
import { UpdateCustomerModalComponent } from '../update-customer-modal/update-customer-modal.component';
import { CommonModule } from '@angular/common';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    MatIconModule,
    LoaderComponent,
    UpdateCustomerModalComponent,
    CommonModule,
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {
  @ViewChild(UpdateCustomerModalComponent) updateModalForm: UpdateCustomerModalComponent | undefined

  customerService = inject(CustomersService)

  customersList: Customers[] = []
  currentPage = 1
  totalPages = 0
  isLoading = false

  openModal(customers: any){
    if (this.updateModalForm) {
      this.updateModalForm.openUpdateCustomerModal(customers) // get this function from the open update modal function in the component
      //console.log(customers)
    }
  }

  ngOnInit(): void {
    this.customerService.currentCustomer.subscribe(customers => {
      //console.log(customers)
      this.displayAllCustomers()
    })
  }

  displayAllCustomers(){
    this.isLoading = true
    this.customerService.getAllCustomers(this.currentPage).subscribe((res: ResponseCustomers) => {
      setInterval(() => {
        this.isLoading = false
      }, 1000)
      this.customersList = res.customers.data
      this.totalPages = res.customers.last_page
      console.log(res.customers) // console log list of all customers
    })
  }

  openUpdateModal(customers: any){
    //console.log(customers)
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayAllCustomers();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayAllCustomers();
    }
  }


}
