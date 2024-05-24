import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * An authentication guard that checks if the user is authenticated.
 * If the user is authenticated, they are allowed to access the route.
 * If the user is not authenticated, they are redirected to the sign-in page.
 *
 * @param route - The route to which the user is trying to navigate.
 * @param state - The state of the router.
 * @returns An Observable that emits a boolean value indicating whether the user is allowed
 * to access the route, or an Observable that emits a UrlTree representing the URL to which
 * the user should be redirected.
 */
export const AuthGuard: CanActivateFn | CanActivateChildFn = (
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
) => {
    // Inject the authentication service and router.
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check the authentication status of the user.
    return authService.check().pipe(
        switchMap((authenticated) => {
            // If the user is authenticated, allow the access.
            if (authenticated) {
                return of(true);
            }

            // If the user is not authenticated, redirect them to the sign-in page.
            // If the user is trying to access the sign-out page, redirect them to the sign-in page.
            // If the user is trying to access any other page, redirect them to the sign-in page
            // with the current URL as the redirect URL.
            return of(
                router.parseUrl(
                    state.url === '/sign-out'
                        ? 'sign-in'
                        : `sign-in?redirectURL=${state.url.slice(1)}`
                )
            );
        })
    );
};
