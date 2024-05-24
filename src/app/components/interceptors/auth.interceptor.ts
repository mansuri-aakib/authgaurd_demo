import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export  const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>
{
    const authService = inject(AuthService);
    let newReq = req.clone({
        headers: req.headers
            .set('Authorization', authService.accessToken)
            .set('ApplicationCode', sessionStorage.getItem('applicationCode') ?? '')
    });
    return next(newReq);
};