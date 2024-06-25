import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-pagina-erro',
  standalone: true,
  imports: [],
  templateUrl: './pagina-erro.component.html',
  styleUrl: './pagina-erro.component.scss'
})
export class PaginaErroComponent {

  constructor(private router: Router, private authService: AuthService){}

  sair(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  home(){
    this.router.navigate(['/pecas-pendentes'])
  }

}