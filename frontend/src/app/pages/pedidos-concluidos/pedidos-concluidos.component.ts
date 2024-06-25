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
  selector: 'app-pecas-pendentes',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    CommonModule
  ],
  templateUrl: './pedidos-concluidos.component.html',
  styleUrl: './pedidos-concluidos.component.scss'
})
export class PedidosConcluidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  id_pedido: number | null = null;
  cod_PECA_DATASUL: number | null = null;
  nome_peca: string = '';
  part_number: string = '';
  ordem_servico: number | null = null;
  selecionado?: boolean;
  constructor(private apiService: ApiService, public authService: AuthService, private http: HttpClient) {
    this.getPedidosPendentesFunc();
  }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.id_pedido === null || this.id_pedido === 0) { this.getPedidosPendentesFunc(); }

    }, 240000);
  }

  getPedidosPendentesFunc(): void {
    this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/CONCLUIDO`)
      .subscribe(pedidos => this.pedidos = pedidos);

  }

  getPedidosPendentesPorPedido() {
    if (this.id_pedido !== null && this.id_pedido !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/pedido/CONCLUIDO/${this.id_pedido}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
    console.log(this.id_pedido);
  }

  getPedidosPendentesPorItem() {
    if (this.cod_PECA_DATASUL !== null && this.cod_PECA_DATASUL !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/codPeca/CONCLUIDO/${this.cod_PECA_DATASUL}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  getPedidosPendentesPorDescricao() {
    if (this.nome_peca !== null && this.nome_peca !== '') {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/descricao/CONCLUIDO/${this.nome_peca}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  getPedidosPendentesPorPartnumber() {
    if (this.part_number !== null && this.part_number !== '') {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/partnumber/CONCLUIDO/${this.part_number}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  getPedidosPendentesPorOs() {
    if (this.ordem_servico !== null && this.ordem_servico !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/os/CONCLUIDO/${this.ordem_servico}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  faturarPedido(){
    const token = this.authService.getLoggedToken();
    const pedidoSelecionado = this.pedidos.find(pedido => pedido.selecionado);

    // Verificar se um pedido está selecionado
    if (pedidoSelecionado) {
        const pedidoId = pedidoSelecionado.id_pedido;
        
        // Dados do pedido para atualização
        const dadosPedido = {
            status: "FATURADO"
        };
    if(this.authService.isTecnico()){
      fetch(`${this.apiService.apiUrl}/pedidos/fat/${pedidoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosPedido) // converte o objeto para JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar pedido');
        }
        return response.json();
    })
    .then(data => {
        console.log('Pedido atualizado com sucesso:', data);
        this.getPedidosPendentesFunc();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    }else{
      alert("Seu usuário não tem permissão para finalizar um pedido!")
    }
  }

}
}