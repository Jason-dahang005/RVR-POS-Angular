import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookedCottage } from '../models/entrance';

@Injectable({
  providedIn: 'root'
})
export class BookedCottageService {

  constructor(private http: HttpClient) { }

  // getAllBookedCottages(): Observable<BookedCottage>{
  //   return this.http.get<BookedCottage>()
  // }


}
