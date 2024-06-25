import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ApiService } from '../../service/api.service';
import { Pecas } from '../../model/pecas.model';

@Component({
  selector: 'app-editar-peca',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './editar-peca.component.html',
  styleUrl: './editar-peca.component.scss'
})
export class EditarPecaComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditarPecaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void{
    const dados ={
      id: this.data.id,
      nome_peca: this.data.nomePeca,
      codPecaDatasul: this.data.codPecaDatasul,
      partNumber: this.data.partNumber,
      fabricante: this.data.fabricante
    }
        fetch(`${this.apiService.apiUrl}/pecas`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dados) // converte o objeto para JSON
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao atualizar pedido');
          }
          return response.json();
      })
      .then(data => {
          alert('Pedido atualizado com sucesso');
          this.dialogRef.close();
      })
      .catch(error => {
          console.error('Erro:', error);
      });
      }
    }
