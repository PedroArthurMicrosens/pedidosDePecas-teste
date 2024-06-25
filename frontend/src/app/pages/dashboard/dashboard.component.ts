import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DefaultHeaderComponent,
    DefaultSidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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
