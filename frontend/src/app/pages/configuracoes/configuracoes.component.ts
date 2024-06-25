import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent
  ],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent implements OnInit{
  attForm: FormGroup;
  attPage: number =0;

  constructor(private apiService: ApiService ,private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { 
    this.attForm = this.formBuilder.group({
      valor: ''
    })
   }
 
  alterAttPecas(){
    const valor = this.attForm.get('valor')?.value
    const body = { att_page: valor };

    this.http.put(`${this.apiService.apiUrl}/page/1`, body)
    .subscribe(
    (response) => {
      // Manipule a resposta aqui, se necessário
      alert('Atualização bem-sucedida');
    },
    (error) => {
      // Manipule os erros aqui, se necessário
      alert('Erro durante a atualização');
    }
  );
  }

  mostraAtt(){
    this.http.get<any>(`${this.apiService.apiUrl}/page/1`).subscribe(
      value => {
        this.attPage = value.att_page;
        alert(this.attPage + " minutos")
      },
      error => {
        console.error('Error fetching att_page value:', error);
      }
    );
  }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  ngOnInit(): void {
    // Verifica se o usuário tem a role de ADMIN
  if (!this.authService.isAdmin()) {
    // Se o usuário não tiver a role de ADMIN, redirecione-o para outra página
    this.router.navigate(['/errorRangeValueAccessor']);
  }
}

}
