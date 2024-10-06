import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EntranceService } from '../../services/entrance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddEntranceModalComponent } from '../add-entrance-modal/add-entrance-modal.component';
import { LoaderComponent } from '../loader/loader.component';
import { SuccessAlertComponent } from "../success-alert/success-alert.component";
import { Entrance, entranceReponse } from '../../models/entrance';

@Component({
  selector: 'app-entrance-list',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    AddEntranceModalComponent,
    LoaderComponent,
    SuccessAlertComponent
],
  templateUrl: './entrance-list.component.html',
  styleUrl: './entrance-list.component.css'
})
export class EntranceListComponent implements OnInit {
  @ViewChild('openAddEntranceModalForm') openAddEntranceModalForm : AddEntranceModalComponent | undefined 

  entranceList: Entrance[] = []
  isLoading = false
  currentPage = 1
  totalPages = 0

  entranceService = inject(EntranceService)

  ngOnInit(): void {
    this.entranceService.currentEntrance.subscribe(entrance => {
      this.displayAllEntrance()
    }) 
  }

  displayAllEntrance(){
    this.isLoading = true
    this.entranceService.getAllEntrance(this.currentPage).subscribe({
      next: (res: entranceReponse) => {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
        console.log(res.entrance)
        this.entranceList = res.entrance.data
        this.totalPages = res.entrance.last_page
        //console.log(res.entrance.booked_cottages)
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  openAddEntranceModal(entrance: any){
    this.openAddEntranceModalForm.openAddEntranceModal(entrance)
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayAllEntrance();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayAllEntrance();
    }
  }
}
