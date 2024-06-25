import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-cadastrar-pecas',
  standalone: true,
  imports: [
    CommonModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-pecas.component.html',
  styleUrl: './cadastrar-pecas.component.scss'
})
export class CadastrarPecasComponent implements OnInit {
pecasRegisterForm: FormGroup;
  constructor(private apiService: ApiService,private authService: AuthService, private http: HttpClient, private router: Router, private formBuilder: FormBuilder){
    this.pecasRegisterForm = this.formBuilder.group({
      nome_peca: '',
      codPecaDatasul: '',
      partNumber: '',
      fabricante: '',
    })
  }

  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

  cadastrarPeca(){
    const data = {
      nome_peca: this.pecasRegisterForm.get('nome_peca')?.value,
      codPecaDatasul: this.pecasRegisterForm.get('codPecaDatasul')?.value,
      partNumber: this.pecasRegisterForm.get('partNumber')?.value,
      fabricante: this.pecasRegisterForm.get('fabricante')?.value
    }

    this.http.post(`${this.apiService.apiUrl}/pecas/register`, data)
    .subscribe(() => {
      console.log('Peça cadastrado com sucesso!');
      alert('Peça cadastrado com sucesso!')
    },(error) => {
      console.error('Erro ao cadastrar peça:', error);
      alert("Erro ao cadastrar peça, por favor revise os dados e tente novamente!")
    });    

    this.limpaDados();

  }

  limpaDados(){
    this.pecasRegisterForm = this.formBuilder.group({
      nome_peca: '',
      codPecaDatasul: '',
      partNumber: '',
      fabricante: '',
    })
  }
  


  ngOnInit(): void {
    if(!this.authService.isUser){
      this.router.navigate(['/errorRangeValueAccessor']);
    }
  }

}
