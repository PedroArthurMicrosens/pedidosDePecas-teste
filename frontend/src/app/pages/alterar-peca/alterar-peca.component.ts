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
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { EditarPecaComponent } from '../editar-peca/editar-peca.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-alterar-peca',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './alterar-peca.component.html',
  styleUrl: './alterar-peca.component.scss'
})
export class AlterarPecaComponent implements OnInit{
  pecas: Pecas[] = [];
  id: number | null = null;
  codPecaDatasul: number | null = null;
  nomePeca: string = '';
  partNumber: string = '';
  fabricante: string = '';

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router, 
    private http:HttpClient,
    private dialog: MatDialog,
  ){
    this.getPecasFunc();
  }

  openDialog(peca: Pecas): void {
    const pecaCopia = { ...peca };
    const dialogRef = this.dialog.open(EditarPecaComponent, {
      width: '1070px',
      height:'250px',
      data: pecaCopia,
      position: { top: '10%', left: '24.1%' },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.pecas.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.pecas[index] = result;
        }
      }
      
    this.getPecasFunc();
    });
  }

  deletPeca(peca: Pecas): void{
    this.http.delete(`${this.apiService.apiUrl}/pecas/${peca.id}`)
    .subscribe();
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
      .subscribe(
        pecas => this.pecas = pecas );
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
