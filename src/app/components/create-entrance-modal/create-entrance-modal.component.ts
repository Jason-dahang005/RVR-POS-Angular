import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { CottageService } from '../../services/cottage.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customers } from '../../models/customer';
import { CottageListResponse } from '../../models/cottage';
import { EntranceService } from '../../services/entrance.service';
import { createEntranceResponse } from '../../models/entrance';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-entrance-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-entrance-modal.component.html',
  styleUrl: './create-entrance-modal.component.css'
})
export class CreateEntranceModalComponent implements OnInit {
  
  entranceForm: FormGroup
  customerList: Customers[] = []
  cottageList: CottageListResponse[] = []
  currentPage: 1

  constructor(
    private customerService: CustomersService,
    private cottageService: CottageService,
    private fb: FormBuilder,
    private entranceService: EntranceService
  ){}

  ngOnInit(): void {

    this.entranceForm = this.fb.group({
      name: [''],
      total: [0],
      cash: [0],
      change: [0],
      cc: this.fb.array([]),
      bc: this.fb.array([])
    })

    this.customerService.getAllCustomers(this.currentPage).subscribe((res: any) => {
      console.log(res)
      this.customerList = res.customers.data

      this.customerList.forEach((customer) => {
        const ccArray = this.fb.group({
          count: [0],
          customer_id: customer.id,
          rate: customer.rate,
          subTotal: [0]
        })
        this.cc.push(ccArray)
      })
    })

    this.cottageService.getAllCottages(this.currentPage).subscribe((res: any) => {
      console.log(res)
      this.cottageList = res.cottages.data

      this.cottageList.forEach((cottage) => {
        const bcArray = this.fb.group({
          quantity: [0],
          cottage_id: cottage.id,
          price: cottage.price,
          sTotal: [0],
          available: cottage.available
        })
        this.bc.push(bcArray)
        console.log(bcArray)
      })
    })
  }

  get cc(): FormArray {
    return this.entranceForm.get('cc') as FormArray
  }

  get bc():FormArray {
    return this.entranceForm.get('bc') as FormArray
  }

  calculateCustomerCountTotal(index: number){

    // CALCULATIONS FOR CUSTOMER LIST
    let newSubTotal: number = 0
    
    const ccGroup = this.cc.controls[index] as FormGroup
    
    const countControl = ccGroup.get('count')
    const rateControl = ccGroup.get('rate')
    const totalControl = ccGroup.get('subTotal')

    const count = countControl.value
    const rate = rateControl.value

    newSubTotal = count * rate
    totalControl.setValue(newSubTotal)

    this.calculateTotal()

    //this.entranceForm.get('total').setValue(grandTotal)
  }

  calculateCottageQuantityTotal(index: number){

    // CALCULATION FOR COTTAGE LIST
    let newCottageTotal: number = 0

    const bcGroup = this.bc.controls[index] as FormGroup

    const quantityControl = bcGroup.get('quantity')
    const priceControl = bcGroup.get('price')
    const cTotalControl = bcGroup.get('sTotal')

    const quantity = quantityControl.value
    const price = priceControl.value

    newCottageTotal = quantity * price
    cTotalControl.setValue(newCottageTotal)

    
    //this.entranceForm.get('total').setValue(cottageGrandTotal)
    this.calculateTotal()
  }

  calculateTotal(){
    let cottageGrandTotal: number = 0
    let grandTotal: number = 0
    

    this.bc.controls.forEach((control) => {
      cottageGrandTotal += control.get('sTotal').value
    })

    this.cc.controls.forEach((control) => {
      grandTotal += control.get('subTotal').value
    })

    this.entranceForm.get('total').setValue(grandTotal + cottageGrandTotal)
  }

  calculateChange(){
    let change: number = 0
    let total = this.entranceForm.get('total').value
    let cash = this.entranceForm.get('cash').value
    change = cash - total
    this.entranceForm.get('change').setValue(change)

  }

  getCustomersList(){
    this.customerService.getAllCustomers(this.currentPage).subscribe((res: any) => {
      console.log(res)
      this.customerList = res.customers.data
    })
  }

  getCottagesList(){
    this.cottageService.getAllCottages(this.currentPage).subscribe((res: any) => {
      console.log(res)
      this.cottageList = res.cottages.data
    })
  }

  onSubmitCreateEntrance(){

    const filterBc = this.bc.controls.filter(control => control.get('quantity').value !== 0)
    const filterCc = this.cc.controls.filter(control => control.get('count').value !== 0)

    const entranceData = {
      name: this.entranceForm.get('name').value,
      total: this.entranceForm.get('total').value,
      cc: filterCc.map(control => control.value),
      bc: filterBc.map(control => control.value)
    }

    this.entranceService.createEntrance(entranceData).subscribe({
      next: (res: createEntranceResponse) => {
        console.log(res)
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }
}
