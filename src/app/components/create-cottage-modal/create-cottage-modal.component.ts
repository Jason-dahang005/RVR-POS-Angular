import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CottageService } from '../../services/cottage.service';
import { CottageInputResponse } from '../../models/cottage';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';

@Component({
  selector: 'app-create-cottage-modal',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    SuccessAlertComponent
  ],
  templateUrl: './create-cottage-modal.component.html',
  styleUrl: './create-cottage-modal.component.css'
})
export class CreateCottageModalComponent implements AfterViewInit {
  @ViewChild('createCottageModal') createCottageModal: ElementRef | undefined

  createCottageForm: FormGroup
  isLoading: boolean = false
  isSuccess: boolean = false
  errorMsg: any
  msg: string = ''

  constructor(private fb: FormBuilder, private cottageService: CottageService){
    this.errorMsg
    this.createCottageForm = this.fb.group({
      type: ['', Validators.required],
      price: ['', Validators.required],
      available: ['', Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.createCottageModal.nativeElement.style.display = 'none'
  }

  openCreateCottageModal(){
    this.createCottageModal.nativeElement.style.display = 'flex'
  }

  closeCreateCottageModal(){
    this.createCottageModal.nativeElement.style.display = 'none'
    this.createCottageForm.reset()
  }

  onSubmiteCreateCottage(){
    if(this.createCottageForm.valid){
      this.isLoading = true
      this.cottageService.createNewCottage(this.createCottageForm.value).subscribe({
        next: (res: CottageInputResponse) => {
          setTimeout(() => {
            console.log(res)
            this.isLoading = false
            this.createCottageForm.reset()
            this.closeCreateCottageModal()
            this.msg = res.message
            this.isSuccess = true
            this.cottageService.changeCottage(res)
            setTimeout(() => {
              this.isSuccess = false
            }, 2000)
          }, 2000);

        }, error: (err: HttpErrorResponse) => {
          console.log(err)
          this.isLoading = false
          const apiErrors = err.error.errors
          this.displayError(apiErrors)
        }
      })
    }
  }

  displayError(apiErrors: any){
    this.errorMsg = {}

    for(const fieldName in apiErrors){
      if(apiErrors.hasOwnProperty(fieldName)){
        this.errorMsg[fieldName] = apiErrors[fieldName]
      }
    }
  }

}
