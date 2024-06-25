import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  incorrectCredentials: boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    const username = this.loginForm.get('username')?.value.toLowerCase();
      const data = {
        username: username,
        password: this.loginForm.get('password')?.value,
      };

      
    if (this.loginForm.valid) {
      
  
      this.http.post(`${this.apiService.apiUrl}/auth/login`, data).subscribe((response: any) => {
        const userRole = response.role;
        const nomeUsuario = response.username;
        const id = response.id;
        const token = response.token;
  
        // Armazene o token, o ID e a role do usuário no AuthService
        this.authService.setLoggedInToken(token);
        this.authService.setLoggedInId(id);
        this.authService.setLoggedInRole(userRole);
        this.authService.setLoggedInUsername(nomeUsuario);

        if (userRole === "ADMIN") {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/pecas-pendentes']);
        }

        // Restante do código para redirecionar o usuário com base na role
      }, error => {
        this.incorrectCredentials = true;
        console.error(error);
      });
    }
  }
  
  
}

