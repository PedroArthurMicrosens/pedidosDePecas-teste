// pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = ''; // Substitua pela URL correta da sua API

  constructor(private http: HttpClient) { }

  getPedidosPendentes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`http://localhost:8080/pedidos`);
  }
}
