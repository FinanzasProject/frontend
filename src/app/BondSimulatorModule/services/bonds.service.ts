import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Bond} from '../model/bond';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BondsService {
  private readonly BASE_URL = `${environment.apiUrl}/bonds`;
  private http = inject(HttpClient)
  constructor() {
  }

  getAll(){
    return this.http.get<any[]>(this.BASE_URL);
  }

}
