import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { CottageService } from '../../services/cottage.service';
import { EntranceService } from '../../services/entrance.service';
import { Customers } from '../../models/customer';
import { CottageListResponse } from '../../models/cottage';
import { addEntranceDetails, createEntranceResponse } from '../../models/entrance';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-add-entrance-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './add-entrance-modal.component.html',
  styleUrl: './add-entrance-modal.component.css'
})
export class AddEntranceModalComponent implements OnInit, AfterViewInit {
  @ViewChild('addEntranceModal')  addEntranceModal: ElementRef |undefined

  entranceDetails: addEntranceDetails
  addEntranceForm: FormGroup
  customerList: Customers[] = []
  cottageList: CottageListResponse[] = []
  currentPage: 1
  isSaveLoading = false
  isCalculateChangeLoading = false
  isSuccess: boolean = false
  msg: string = ''

  constructor(
    private customerService: CustomersService,
    private cottageService: CottageService,
    private fb: FormBuilder,
    private entranceService: EntranceService,
  ){
    
  }

  ngOnInit(): void {
    this.addEntranceForm = this.fb.group({
      entrance_id: [0],
      name: ['', Validators.required],
      total: [0],
      cash: [0],
      change: [0],
      cc: this.fb.array([]),
      bc: this.fb.array([])
    })

    this.customerCountFormArrayControl()
    this.bookedCottageFormArrayControl()
  }

  ngAfterViewInit(): void {
    this.addEntranceModal.nativeElement.style.display = 'none'
  }

  openAddEntranceModal(entrance: addEntranceDetails){
    this.addEntranceModal.nativeElement.style.display = 'flex'
    console.log(entrance.id)
    this.entranceDetails = entrance
    this.addEntranceForm.get('entrance_id').setValue(this.entranceDetails.id)
    this.addEntranceForm.get('name').setValue(this.entranceDetails.name)
  }

  closeAddEntranceModal(){
    this.addEntranceModal.nativeElement.style.display = 'none'
  }

  bookedCottageFormArrayControl(){
    this.cottageService.getAllCottages(this.currentPage).subscribe((res: any) => {
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
      })
    })
  }

  customerCountFormArrayControl(){
    this.customerService.getAllCustomers(this.currentPage).subscribe((res: any) => {
      //console.log(res)
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
  }

  get cc(): FormArray {
    return this.addEntranceForm.get('cc') as FormArray
  }

  get bc():FormArray {
    return this.addEntranceForm.get('bc') as FormArray
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

    
    //this.addEntranceForm.get('total').setValue(cottageGrandTotal)
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

    this.addEntranceForm.get('total').setValue(grandTotal + cottageGrandTotal)
  }

  calculateChange(){
    this.isCalculateChangeLoading = true
    setTimeout(() => {
      let change: number = 0
      let total = this.addEntranceForm.get('total').value
      let cash = this.addEntranceForm.get('cash').value
      change = cash - total
      this.addEntranceForm.get('change').setValue(change)
      this.isCalculateChangeLoading = false
    }, 2000)
  }

  onSubmitAddEntrance(){
    if (this.addEntranceForm.valid) {
      this.isSaveLoading = true

      const filterBc = this.bc.controls.filter(control => control.get('quantity').value !== 0 || null)
      const filterCc = this.cc.controls.filter(control => control.get('count').value !== 0 || null)
      
      const addEntranceData = this.addEntranceForm.value
      addEntranceData.id = this.entranceDetails?.id
      addEntranceData.cc = filterCc.map(control => control.value)
      addEntranceData.bc = filterBc.map(control => control.value)

      this.entranceService.addEntrance(addEntranceData).subscribe({
        next: (res: createEntranceResponse) => {
          setTimeout(() => {
            this.isSaveLoading = false
            this.addEntranceModal.nativeElement.style.display = 'none'
            console.log(res)
            this.entranceService.changeEntrance(res)
            setTimeout(() => {
              this.isSuccess = false
            }, 3000)
            this.msg = res.message
          }, 3000);
        }, error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      })
    }
  }
}
