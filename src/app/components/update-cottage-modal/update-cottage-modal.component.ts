import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UpdateCottages } from '../../models/cottage';
import { CottageService } from '../../services/cottage.service';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';
import { LoaderComponent } from '../loader/loader.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-cottage-modal',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    SuccessAlertComponent,
    LoaderComponent
  ],
  templateUrl: './update-cottage-modal.component.html',
  styleUrl: './update-cottage-modal.component.css'
})
export class UpdateCottageModalComponent implements AfterViewInit {
  @ViewChild('updateCottageModal') updateCottageModal: ElementRef | undefined

  updateCottageForm: FormGroup
  cottageDetails: UpdateCottages
  isloading = false
  isSuccess = false
  msg = ''

  ngAfterViewInit(): void {
    this.updateCottageModal.nativeElement.style.display = 'none'
  }

  constructor(private fb: FormBuilder, private cottageService: CottageService){
    this.updateCottageForm = this.fb.group({
      type: this.fb.control(''),
      price: this.fb.control(''),
      available: this.fb.control(''),
    })
  }

  openUpdateCottageModal(cottages: UpdateCottages){
    this.updateCottageModal.nativeElement.style.display = 'flex'
    this.cottageDetails = cottages
    this.updateCottageForm.setValue({
      type: this.cottageDetails.type,
      price: this.cottageDetails.price,
      available: this.cottageDetails.available
    })
    console.log(cottages)
  }

  onSubmiteUpdateCottage(){
    this.isloading = true
    const updateCottage = this.updateCottageForm.value
    updateCottage.id = this.cottageDetails?.id
    this.cottageService.updateCottage(updateCottage).subscribe({
      next: (res: any) => {
       setTimeout(() => {
        console.log(res)
        this.cottageService.changeCottage(res)
        this.msg = res.message
        this.isloading = false
        this.closeUpdateCottageModal()
        this.isSuccess = true
        setTimeout(() => {
          this.isSuccess = false
        }, 3000);
       }, 1000)
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
    
  }

  closeUpdateCottageModal(){
    this.updateCottageModal.nativeElement.style.display = 'none'
  }
}
