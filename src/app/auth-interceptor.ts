import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>,
     next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest=req.clone({headers:req.headers.append('Intercepted-header','Testing interceptor')})
        return next.handle(modifiedRequest);
    }

}