import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntranceService {

  http = inject(HttpClient)

  private entranceSource = new BehaviorSubject<any>(null)

  currentEntrance = this.entranceSource.asObservable()

  changeEntrance(entrance: any){
    this.entranceSource.next(entrance)
  }

  getAllEntrance(page: number = 1): Observable<any>{
    return this.http.get<any>(`${environment.apiLink}display-entrance?page=${page}`)
  }

  createEntrance(entrance: any): Observable<any>{
    return this.http.post<any>(`${environment.apiLink}create-entrance`, entrance)
  }

  addEntrance(entrance: any): Observable<any>{
    return this.http.put(`${environment.apiLink}add-entrance/${entrance.id}`, entrance)
  }
}
