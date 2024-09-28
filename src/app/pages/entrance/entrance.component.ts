import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EntranceListComponent } from '../../components/entrance-list/entrance-list.component';
import { CommonModule } from '@angular/common';
import { CreateEntranceModalComponent } from '../../components/create-entrance-modal/create-entrance-modal.component';

@Component({
  selector: 'app-entrance',
  standalone: true,
  imports: [
    MatIconModule,
    EntranceListComponent,
    CommonModule,
    CreateEntranceModalComponent
  ],
  templateUrl: './entrance.component.html',
  styleUrl: './entrance.component.css'
})
export class EntranceComponent {
  

}
