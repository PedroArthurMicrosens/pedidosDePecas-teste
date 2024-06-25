import { Component, OnInit, HostListener} from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
  ],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.scss'
})
export class RealizarPedidoComponent implements OnInit{
  id_peca: number = 0;
  cod_item: string = '';
  nome_peca: string = '';
  partNumber: string = '';
  fabricante: string = '';
  active: boolean = true;
  orderService: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private http: HttpClient){ }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  solicitarPeca(){
    //this.addTokenToRequests();
    const data = {
      peca_id: this.id_peca,
      usuarios_id_abertura: this.authService.getLoggedId(),
      ordem_servico: this.orderService,
    }
    this.http.post(`${this.apiService.apiUrl}/pedidos`, data).subscribe(()=>{
      console.log("Pedido realizado com sucesso!");
      alert("Pedido realizado com sucesso! pedido: ")
    }, (error)=>{
      console.log("Erro ao realizar pedido: ", error);
      alert("Erro ao realizar pedido, por favor revise os dados da peça e tente novamente")
    })

    this.limpaDados();
  }

  limpaDados(){
    this.id_peca = 0;
    this.cod_item = '';
    this.nome_peca = '';
    this.partNumber = '';
    this.fabricante = '';
    this.active = true;
    this.orderService = '';
  }

  buscarDetalhesPorCod() {
    this.http.get<any>(`${this.apiService.apiUrl}/pecas/${this.cod_item}`).subscribe(
      data => {
        console.log("passei aqui")
        this.id_peca = data.id;
        this.nome_peca = data.nomePeca;
        this.partNumber = data.partNumber;
        this.fabricante = data.fabricante;
        this.active = data.active;
      }      ,
      error => {
        console.error('Erro ao recuperar detalhes da peça:', error);
      }
    );
  }

  buscarDetalhesPorPN() {
    this.http.get<any>(`${this.apiService.apiUrl}/pecas/pn2/${this.partNumber}`).subscribe(
      data => {
        this.id_peca = data.id;
        this.nome_peca = data.nomePeca;
        this.cod_item = data.codPecaDatasul;
        this.fabricante = data.fabricante;
        this.active = data.active;
      },
      error => {
        console.error('Erro ao recuperar detalhes da peça:', error);
      }
    );
    
  }

  limparCampos(){
    this.id_peca = 0;
    this.cod_item = '';
    this.nome_peca = '';
    this.partNumber = '';
    this.fabricante = '';
    this.active = true;
  }

  ngOnInit(): void {
    if(!this.authService.isUser()){
      this.router.navigate(['/errorRangeValueAccessor']);
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  handleTab(event: KeyboardEvent) {
    if (event.key === 'Tab' && this.cod_item !== '') {
      this.buscarDetalhesPorCod();
    }
    if(event.key === 'Tab' && this.partNumber !== '') {
      this.buscarDetalhesPorPN();
    }
  }

  private addTokenToRequests() {
    console.log(this.authService.getLoggedToken())
    const token = this.authService.getLoggedToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      // Adicionando o cabeçalho de autorização diretamente na solicitação
      this.http.get(`${this.apiService.apiUrl}/pedidos`, { headers }).subscribe((response) => {
        // Código de manipulação de resposta...
      }, error => {
        console.error('Erro na solicitação:', error);
      });
    }
  }

}
