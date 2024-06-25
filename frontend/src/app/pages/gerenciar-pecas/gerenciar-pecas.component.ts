import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-pecas',
  standalone: true,
  imports: [
    CommonModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './gerenciar-pecas.component.html',
  styleUrl: './gerenciar-pecas.component.scss'
})
export class GerenciarPecasComponent implements OnInit {
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
