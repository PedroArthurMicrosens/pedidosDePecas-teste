import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private usernameKey: (string || null) = "";
  private usernameKey = 'loggedInUsername';
  private roleKey = 'loggedInrole';
  private idKey = 'loggedInId';
  private tokenKey = 'loggedInToken'

  constructor(private router: Router) { }

  setLoggedInToken(token: string) {
    localStorage.setItem(this.tokenKey, token); // armazena o token usando a chave correta
  }

  getLoggedToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setLoggedInId(id: string){
    localStorage.setItem(this.idKey, id);
  }

  getLoggedId(){
    return localStorage.getItem(this.idKey);
  }

  setLoggedInUsername(username: string) {
    localStorage.setItem(this.usernameKey, username);
  }
  
  setLoggedInRole(role: string){
    localStorage.setItem(this.roleKey, role);
  }

  getLoggedInUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getLoggedInRole(): string | null{
    return localStorage.getItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return this.getLoggedInUsername() !== null;
  }

  isAdmin(): boolean{
    console.log(this.getLoggedInRole());
    return this.getLoggedInRole() == 'ADMIN';
  }

  isUser(): boolean{
    return this.getLoggedInRole() === ('ADMIN' || 'USER' || 'SUPERTECNICO');
  }

  isTecnico(): boolean{
    return this.getLoggedInRole() === ('ADMIN' || 'TECNICO' || 'SUPERTECNICO');
  }

  logout() {
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }

}

