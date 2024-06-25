import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent {
  @Input() title: String = ""; 
  // @Input() user: String = "";
  constructor(public authService:AuthService, private router: Router){}

  submitLogout(){
    this.authService.logout();
  }

  home(){
    if(this.authService.isAdmin()){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/pecas-pendentes'])
    }
  }

}


