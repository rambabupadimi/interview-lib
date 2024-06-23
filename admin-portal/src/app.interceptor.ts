import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(
        private route: Router,

      //  private authService: AuthService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        console.log('called interceptor');
        
            const token = localStorage.getItem('accessToken');
            if (token) {
                request = this.addToken(request, token);
            } 
        



        return next.handle(request).pipe(

            catchError((error) => {
                console.log(error);
                if (error.status === 440) {
                    this.isRefreshing = false;
                    /**  return this.handle440Error(request, next); */
                    
                    return throwError(()=> new Error());
                } else if (error.status === 441 || (error.status === 401 && error.error.error ==='Not logged in')) {
                    // localStorage.clear();
                    // this.route.navigate(['/']);
                    this.userLogout();
                    return '';
                } else if (error.status === 0 ) {
                    return throwError(() => new HttpErrorResponse({ error: { Message: 'Oops something went wrong' }, status: 422 }));
                } 
                else {
                    console.log(error);
                    return throwError(() => error);
                }
            })
        ) as Observable<HttpEvent<any>>;;
    }



    userLogout() {
            localStorage.clear();
            this.route.navigate(['']);
        
    }    

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': "Bearer "+token,
            },
        });
    }

 

    // private handle440Error(request: HttpRequest<any>, next: HttpHandler) {
    //     if (!this.isRefreshing) {
    //         this.isRefreshing = true;
    //         this.refreshTokenSubject.next(null);
    //         return this.authService
    //             .refreshToken({ 'Refresh-Token': localStorage.getItem('refresh-token') })
    //             .pipe(
    //                 switchMap((res: any) => {
    //                     const accessToken = localStorage.getItem('access-token')
    //                     this.isRefreshing = false;
    //                     this.refreshTokenSubject.next(accessToken);
    //                     return next.handle(this.addToken(request, accessToken as string));
    //                 }),
    //                 catchError((err) => {
    //                     let errorMsg: string;
    //                     if (err.error instanceof ErrorEvent) {
    //                         localStorage.clear();
    //                         errorMsg = `Error: ${err.error.message}`;
    //                         this.route.navigate(['/']);
    //                         return [];
    //                     } else {
    //                         errorMsg = AppConstantObjects.getServerErrorMessage(err);
    //                     }
    //                     return throwError(errorMsg);
    //                 })
    //             );
    //     } else {
    //         return this.refreshTokenSubject.pipe(
    //             filter((token) => token != null),
    //             take(1),
    //             switchMap((jwt) => {
    //                 return next.handle(this.addToken(request, jwt));
    //             })
    //         );
    //     }
    // }


}
