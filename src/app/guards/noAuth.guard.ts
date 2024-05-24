import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * A guard that checks if the user is authenticated. If the user is authenticated,
 * they are redirected to the root URL. If the user is not authenticated, they are allowed
 * to access the route.
 *
 * @param route - The route to which the user is trying to navigate.
 * @param state - The state of the router.
 * @returns An Observable that emits a boolean value indicating whether the user is allowed
 * to access the route, or an Observable that emits a UrlTree representing the URL to which
 * the user should be redirected.
 */
export const NoAuthGuard: CanActivateFn & CanActivateChildFn = (
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
): import('rxjs').Observable<boolean | import('@angular/router').UrlTree> => {
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(AuthService)
        .check()
        .pipe(
            switchMap((authenticated: boolean) => {
                // If the user is authenticated...
                if (authenticated) {
                    return of(router.parseUrl(''));
                }

                // Allow the access
                return of(true);
            })
        );
};
