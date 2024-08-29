import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CottageInput, CottageInputResponse, ResponseCottages } from '../models/cottage';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CottageService {

  constructor() { }

  http = inject(HttpClient)

  private cottageSource = new BehaviorSubject<any>(null)

  currentCottage = this.cottageSource.asObservable()

  changeCottage(cottages: any){
    this.cottageSource.next(cottages)
  }

  createNewCottage(cottages: CottageInputResponse): Observable<CottageInputResponse>{
    return this.http.post<CottageInputResponse>(`${environment.apiLink}create-cottages`, cottages)
  }

  getAllCottages(page: number = 1): Observable<ResponseCottages>{
    return this.http.get<ResponseCottages>(`${environment.apiLink}display-cottages?page=${page}`)
  }

  updateCottage(cottages: any): Observable<any>{
    return this.http.put<any>(`${environment.apiLink}update-cottages/${cottages.id}`, cottages)
  }
}