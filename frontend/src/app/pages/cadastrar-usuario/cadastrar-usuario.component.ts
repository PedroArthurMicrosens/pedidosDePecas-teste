import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss'
})
export class CadastrarUsuarioComponent implements OnInit {
  registerForm: FormGroup;
  senhaNaoIguais: boolean = false;

  constructor(private apiService: ApiService,private authService: AuthService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder){
    //variaveis utilizadas no html que funcionam como um json para receber e passar informações.
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      password_2:'',
      role: ''
    })
  }
  // função utilizada para capturar a role do usuário loggado
  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }
  //função para reaizar o cadastro de um novo usuário
  cadastrarUsuario() {
    //salvamos a informação da segunda senha informada para podermos comparar com a primeira que será passada no bloca de dados 'data'
    const password_2 = this.registerForm.get('password_2')?.value
    
    const data ={
      username: this.registerForm.get('username')?.value.toLowerCase(),
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value
    }
    if(data.password === password_2){
      this.http.post(`${this.apiService.apiUrl}/auth/register`, data)
      .subscribe(() => {
        alert('Usuário cadastrado com sucesso!');
      }, (error) => {
        if (error.status === 409) {
          console.error('Usuário já existe:', error);
          alert('O nome de usuário já está em uso. Por favor, escolha outro nome de usuário.');
        } else {
          console.error('Erro ao cadastrar usuário:', error);
          alert('Erro ao cadastrar usuário!')
          //todo:tratar erros
        }
      });
    }else{
      //senhasNaoIguais funciona como uma estrutura de decisão para aparecer o bloco de código adicional no html
      this.senhaNaoIguais = true;
      console.log("senhas não são iguais!")
      alert("senhas não são iguais!")
    }

    this.limpaDados();
  }
  //função utilizada para limpar os campos de dados
  limpaDados(){
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      password_2:'',
      role: ''
    })
  }
  //utlizado para capturar informações sobre as permissões do usuário assim que ele tenta acessar a página, 
  //se não atender aos requisitos ele é redirecionado para uma página de erro
  ngOnInit(): void {
    if(!this.authService.isAdmin){
      this.router.navigate(['/errorRangeValueAccessor']);
    }
  }
}
