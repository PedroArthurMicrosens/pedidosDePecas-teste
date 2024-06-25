import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.scss'
})
export class GerenciarUsuariosComponent implements OnInit {

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
