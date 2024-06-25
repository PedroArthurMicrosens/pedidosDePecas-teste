import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { PedidoService } from '../../service/pedidos.service';
import { Pedido } from '../../model/pedido.model';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    CommonModule
  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit{
  pedidos: Pedido[] = [];
  id_pedido: number | null = null;
  cod_PECA_DATASUL: number | null = null;
  nome_peca: string = '';
  part_number: string = '';
  ordem_servico: number | null = null;
  selecionado?: boolean;

  constructor(private apiService: ApiService, public authService: AuthService, private http: HttpClient) {
    this.getPedidosFunc();
  }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.id_pedido === null || this.id_pedido === 0) { this.getPedidosFunc(); }

    }, 240000);
  }

  getPedidosFunc(): void {
    this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/pedidos`)
      .subscribe(pedidos => this.pedidos = pedidos);

  }

  getPedidosPorPedido() {
    if (this.id_pedido !== null && this.id_pedido !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/pedido/${this.id_pedido}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosFunc()
    }
    console.log(this.id_pedido);
  }

  getPedidosPorItem() {
    if (this.cod_PECA_DATASUL !== null && this.cod_PECA_DATASUL !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/codPeca/${this.cod_PECA_DATASUL}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosFunc()
    }
  }

  getPedidosPorDescricao() {
    if (this.nome_peca !== null && this.nome_peca !== '') {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/descricao/${this.nome_peca}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosFunc()
    }
  }

  getPedidosPorPartnumber() {
    if (this.part_number !== null && this.part_number !== '') {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/partnumber/${this.part_number}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosFunc()
    }
  }

  getPedidosPorOs() {
    if (this.ordem_servico !== null && this.ordem_servico !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/os/${this.ordem_servico}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosFunc()
    }
  }

}


