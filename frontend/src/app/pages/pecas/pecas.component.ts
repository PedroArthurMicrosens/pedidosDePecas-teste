import { Component, OnInit } from '@angular/core';
import { DefaultHeaderComponent } from '../../components/default-header/default-header.component';
import { DefaultSidebarComponent } from '../../components/default-sidebar/default-sidebar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Pecas } from '../../model/pecas.model';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-pecas',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    CommonModule
  ],
  templateUrl: './pecas.component.html',
  styleUrl: './pecas.component.scss'
})
export class PecasComponent implements OnInit{
  pecas: Pecas[] = [];
  codPecaDatasul: number | null = null;
  nomePeca: string = '';
  partNumber: string = '';
  fabricante: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private http:HttpClient){
    this.getPecasFunc();
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
  getPecasFunc(): void {
    this.http.get<Pecas[]>(`${this.apiService.apiUrl}/pecas`)
      .subscribe(pecas => this.pecas = pecas);
  }

  // função para buscar peças pelo filtro ITEM
  getPecasPorItem() {
    if (this.codPecaDatasul !== null && this.codPecaDatasul !== 0) {
      this.http.get<Pecas[]>(`${this.apiService.apiUrl}/pecas/codpeca/${this.codPecaDatasul}`)
        .subscribe(pecas => this.pecas = pecas);
    } else {
      this.getPecasFunc()
    }
  }

  // função para buscar peças pelo filtro DESCRICAO
  getPecasPorDescricao() {
    if (this.nomePeca !== null && this.nomePeca !== '') {
      this.http.get<Pecas[]>(`${this.apiService.apiUrl}/pecas/descricao/${this.nomePeca}`)
        .subscribe(pecas => this.pecas = pecas);
    } else {
      this.getPecasFunc()
    }
  }

  // função para buscar peças pelo filtro PARTNUMBER
  getPecasPorPartnumber() {
    if (this.partNumber !== null && this.partNumber !== '') {
      this.http.get<Pecas[]>(`${this.apiService.apiUrl}/pecas/pn/${this.partNumber}`)
        .subscribe(pecas => this.pecas = pecas);
    } else {
      this.getPecasFunc()
    }
  }

  // função para buscar peças pelo filtro FABRICANTE
  getPecasPorFabricante() {
    if (this.fabricante !== null && this.fabricante !== '') {
      this.http.get<Pecas[]>(`${this.apiService.apiUrl}/pecas/fabricante/${this.fabricante}`)
        .subscribe(pecas => this.pecas = pecas);
    } else {
      this.getPecasFunc()
    }
  }

}
