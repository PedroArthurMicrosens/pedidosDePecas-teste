import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl: string = 'http://localhost:8080';

  constructor() { }
}
