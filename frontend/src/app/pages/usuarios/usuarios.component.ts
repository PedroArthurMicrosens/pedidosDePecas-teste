import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Usuarios } from '../../model/usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    CommonModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios: Usuarios[] = [];
  id:number = 0;
  username: string = '';
  role: string = '';
  status: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private http:HttpClient){
    this.getUsuariosFunc();
  }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  ngOnInit(): void {
    if(!this.authService.isAdmin){
      this.router.navigate(['/errorRangeValueAccessor']);
    }
  }
  // função para buscar todas as peças
  getUsuariosFunc(): void {
    this.http.get<Usuarios[]>(`${this.apiService.apiUrl}/auth/all-usuarios`)
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  // função para buscar peças pelo filtro ITEM
  getUsuariosPorUsername() {
    if (this.username !== null && this.username !== '') {
      const keyword = this.username;
      this.http.get<Usuarios[]>(`${this.apiService.apiUrl}/auth/search?keyword=${keyword}`)
        .subscribe(usuarios => this.usuarios = usuarios);
    } else {
      this.getUsuariosFunc()
    }
  }

  //função para ativar usuários que estão inativos
  ativaUsuario(){
    const token = this.authService.getLoggedToken();
    const usuarioSelecionado = this.usuarios.find(usuarios => usuarios.selecionado);

    // Verificar se um pedido está selecionado
    if (usuarioSelecionado) {
        const usuarioId = usuarioSelecionado.id;
      
    if(this.authService.isAdmin()){
      fetch(`${this.apiService.apiUrl}/auth/locked/${usuarioId}/1`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar Usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('usuário atualizado com sucesso:', data);
        this.getUsuariosFunc();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    }else{
      alert("Seu usuário não tem permissão para alterar ess informação!")
    }
  }
  }

  inativaUsuario(){
    const token = this.authService.getLoggedToken();
    const usuarioSelecionado = this.usuarios.find(usuarios => usuarios.selecionado);

    // Verificar se um pedido está selecionado
    if (usuarioSelecionado) {
        const usuarioId = usuarioSelecionado.id;
      
    if(this.authService.isTecnico()){
      fetch(`${this.apiService.apiUrl}/auth/locked/${usuarioId}/0`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar Usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('usuário atualizado com sucesso:', data);
        this.getUsuariosFunc();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    }else{
      alert("Seu usuário não tem permissão para alterar ess informação!")
    }
  }
  }

}
