import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CreateCottageModalComponent } from '../create-cottage-modal/create-cottage-modal.component';
import { CottageService } from '../../services/cottage.service';
import { CottageListResponse, ResponseCottages, UpdateCottages } from '../../models/cottage';
import { LoaderComponent } from "../loader/loader.component";
import { CommonModule } from '@angular/common';
import { UpdateCottageModalComponent } from '../update-cottage-modal/update-cottage-modal.component';

@Component({
  selector: 'app-cottage-list',
  standalone: true,
  imports: [
    MatIconModule,
    LoaderComponent,
    CommonModule,
    UpdateCottageModalComponent
],
  templateUrl: './cottage-list.component.html',
  styleUrl: './cottage-list.component.css'
})
export class CottageListComponent implements OnInit {
  @ViewChild('updateCottageModalForm') updateCottageModal : UpdateCottageModalComponent | undefined

  cottageService = inject(CottageService)

  cottageList: CottageListResponse[] = []
  currentPage: number = 1
  totalPages: number = 0
  isLoading = false 

  ngOnInit(): void {
    this.cottageService.currentCottage.subscribe(cottages => {
      console.log(cottages)
      this.displayAllCottages()
    })
  }

  openUpdateCottageModal(cottages: UpdateCottages){
    this.updateCottageModal.openUpdateCottageModal(cottages)
  }

  displayAllCottages(){
    this.isLoading = true
    this.cottageService.getAllCottages(this.currentPage).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.isLoading = false
        }, 1000);

        console.log(res)
        this.cottageList = res.cottages.data
        this.totalPages = res.cottages.last_page
      }
    })
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayAllCottages();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayAllCottages();
    }
  }

}
