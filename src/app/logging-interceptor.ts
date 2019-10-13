import { HttpInterceptor, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req: import("@angular/common/http").HttpRequest<any>, 
    next: import("@angular/common/http").HttpHandler)
    : import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        console.log("Request sent");
        console.log(req);
        return next.handle(req).pipe(tap(
            (event)=>{
                if(event.type===HttpEventType.Response){
                    console.log("Response recieved");
                    console.log(event.body);
                }
            }
        ));
    }

}