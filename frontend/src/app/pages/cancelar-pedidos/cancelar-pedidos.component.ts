import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Pedido } from '../../model/pedido.model';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-cancelar-pedidos',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    CommonModule
  ],
  templateUrl: './cancelar-pedidos.component.html',
  styleUrl: './cancelar-pedidos.component.scss'
})
export class CancelarPedidosComponent implements OnInit{
  // salvamos os dados que retornam das requisições feitas ao servidor no vetor Pedido[]
  pedidos: Pedido[] = [];
  id_pedido: number | null = null;
  cod_PECA_DATASUL: number | null = null;
  nome_peca: string = '';
  part_number: string = '';
  ordem_servico: number | null = null;
  selecionado?: boolean;
  // aqui passamos o valor para a atualização da lista de pedidos,funciona como um valor padrão
  // que vai ser alterado pela requisição ao banco de dados que foi passado pelo admin através das configurações de páginas
  attPage: number = 4000;
  constructor(private apiService: ApiService,public authService: AuthService, private http: HttpClient) {
    this.getPedidosPendentesFunc();
  }

  ngOnInit(): void {
    this.mostraAtt();
  }
  // função que realiza a atualização da lista de pedidos conforme tempo definido nas configurações
  mostraAtt(){
    this.http.get<any>(`${this.apiService.apiUrl}/page/1`).subscribe(
      value => {
        this.attPage = value.att_page;
        setInterval(() => {
          if (this.id_pedido === null || this.id_pedido === 0) { this.getPedidosPendentesFunc(); }
          console.log(this.attPage)
        }, this.minutosParaMilissegundos(this.attPage));
      },
      error => {
        console.error('Error fetching att_page value:', error);
      }
    );
  }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  minutosParaMilissegundos(minutos: number): number {
    const milissegundosPorMinuto = 60000;
    return minutos * milissegundosPorMinuto;
}

  getPedidosPendentesFunc(): void {
    this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/allpedido/CONCLUIDO/SOLICITADO`)
      .subscribe(pedidos => this.pedidos = pedidos);
  }

  getPedidosPendentesPorPedido() {
    if (this.id_pedido !== null && this.id_pedido !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/pedido/SOLICITADO/${this.id_pedido}`)
        .subscribe(pedidos => this.pedidos = pedidos);
        console.log(this.pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
    console.log(this.id_pedido);
  }

  getPedidosPendentesPorItem() {
    if (this.cod_PECA_DATASUL !== null && this.cod_PECA_DATASUL !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/codPeca/SOLICITADO/${this.cod_PECA_DATASUL}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  getPedidosPendentesPorDescricao() {
    if (this.nome_peca !== null && this.nome_peca !== '') {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/descricao/SOLICITADO/${this.nome_peca}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  getPedidosPendentesPorPartnumber() {
    if (this.part_number !== null && this.part_number !== '') {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/partnumber/SOLICITADO/${this.part_number}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }

  getPedidosPendentesPorOs() {
    if (this.ordem_servico !== null && this.ordem_servico !== 0) {
      this.http.get<Pedido[]>(`${this.apiService.apiUrl}/pedidos/os/SOLICITADO/${this.ordem_servico}`)
        .subscribe(pedidos => this.pedidos = pedidos);
    } else {
      this.getPedidosPendentesFunc()
    }
  }
  // função para atualizar pedido
  finalizarPedido(){
    const token = this.authService.getLoggedToken();
    const pedidoSelecionado = this.pedidos.find(pedido => pedido.selecionado);

    if (pedidoSelecionado) {
        const pedidoId = pedidoSelecionado.id_pedido;
        
        // Dados do pedido para atualização
        const dadosPedido = {
            usuarios_id_fechamento: this.authService.getLoggedInUsername(),
            status: "CANCELADO"
        };
    if(this.authService.isTecnico()){
      fetch(`${this.apiService.apiUrl}/pedidos/cancel/${pedidoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosPedido)
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
