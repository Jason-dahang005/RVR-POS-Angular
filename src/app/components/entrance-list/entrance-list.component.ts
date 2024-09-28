import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EntranceService } from '../../services/entrance.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entrance-list',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './entrance-list.component.html',
  styleUrl: './entrance-list.component.css'
})
export class EntranceListComponent implements OnInit {

  entranceList: any[] = []

  entranceService = inject(EntranceService)

  ngOnInit(): void {
    this.displayAllEntrance() 
  }

  displayAllEntrance(){
    this.entranceService.getAllEntrance().subscribe({
      next: (res: any) => {
        console.log(res)
        this.entranceList = res.entrance
        console.log(res.entrance.booked_cottages)
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

}
