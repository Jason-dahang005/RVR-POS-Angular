import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntranceService {

  http = inject(HttpClient)

  getAllEntrance(): Observable<any>{
    return this.http.get<any>(`${environment.apiLink}display-entrance`)
  }

  createEntrance(entrance: any): Observable<any>{
    return this.http.post<any>(`${environment.apiLink}create-entrance`, entrance)
  }
}
