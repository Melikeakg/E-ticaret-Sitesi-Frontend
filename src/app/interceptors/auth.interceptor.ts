import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor() {}
  // request -> herhangi bir post işlemi mesela ürün ekleme, yapılan herhangi bir istek requesttir.
  // next -> Requestten önce pakete bir şey koyup öyle gönderiyor.
  // Mesela requesttin içine bir header koyarsak bütün http isteklerine bu headeri ekler.

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    let newRequest : HttpRequest<any>;
    newRequest = request.clone({
      headers : request.headers.set("Authorization", "Bearer " + token)
    })
    return next.handle(newRequest);
  }
}
