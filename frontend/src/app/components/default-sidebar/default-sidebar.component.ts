import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-default-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './default-sidebar.component.html',
  styleUrl: './default-sidebar.component.scss'
})
export class DefaultSidebarComponent {
  @Input() userType: string | null = ''; // Propriedade de entrada para o tipo de usuário

  constructor() { }
}
