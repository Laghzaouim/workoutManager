import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    token = 'c9790d783821eb9c4c7695ae57d088224a453d7c';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const dupReq = req.clone({
            headers: req.headers.set('Authorization', 'Token ' + this.token)
        });
        return next.handle(dupReq);
    }
};

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
    ]
})
export class InterceptorModule { }

