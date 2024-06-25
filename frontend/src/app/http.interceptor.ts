// http.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getLoggedToken();
    if (authToken) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
    return next.handle(request);
  }
}
