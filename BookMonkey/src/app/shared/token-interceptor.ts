import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authToken = '1234567890';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //                 .- immutable, also clonen
    const newRequest = request.clone({
      // .- neuen Header hinzufügen
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`
      }
    });

    return next.handle(newRequest);
  }
}
