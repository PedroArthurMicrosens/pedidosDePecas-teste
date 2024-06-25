import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './gerenciar-pedidos.component.html',
  styleUrl: './gerenciar-pedidos.component.scss'
})
export class GerenciarPedidosComponent implements OnInit {

  constructor(private authService: AuthService,  private router: Router){
  }
  ngOnInit(): void {
    if(!this.authService.isAdmin){
      this.router.navigate(['/errorRangeValueAccessor']);
    }
  }
  getRole(): string | null{
    return this.authService.getLoggedInRole();
  }

}
