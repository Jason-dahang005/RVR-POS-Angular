import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CottageListComponent } from '../../components/cottage-list/cottage-list.component';
import { CreateCottageModalComponent } from '../../components/create-cottage-modal/create-cottage-modal.component';

@Component({
  selector: 'app-cottages',
  standalone: true,
  imports: [
    CottageListComponent,
    CreateCottageModalComponent
  ],
  templateUrl: './cottages.component.html',
  styleUrl: './cottages.component.css'
})
export class CottagesComponent {

}
