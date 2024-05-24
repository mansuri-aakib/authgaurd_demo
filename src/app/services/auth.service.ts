import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from '../utils/auth.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient: HttpClient = inject(HttpClient);
    set accessToken(token: string) {
        sessionStorage.setItem('accessToken', 'Bearer ' + token);
    }

    get accessToken(): string {
        return sessionStorage.getItem('accessToken') ?? '';
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('http://27.109.17.250:8446/api/v1/identity/login', credentials).pipe(
            switchMap((response: any) => {
                this.accessToken = response.Result.Token;
                this._authenticated = true;
                return of(response);
            }),
        );
    }

    signInUsingToken(): Observable<any> {
        if (AuthUtils._verifyJWTToken(this.accessToken)) {
            this._authenticated = true;
            return of(true);
        }
        else {
            return of(false);
        }
    }

    
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            alert("Expired token");
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

}
