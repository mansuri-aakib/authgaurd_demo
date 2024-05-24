import { Routes } from '@angular/router';
import { NoAuthGuard } from './guards/noAuth.guard';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ExampleComponent } from './components/example/example.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: HomeComponent,
        children: [
            {
                path: 'sign-in',
                component: LoginComponent,
            }
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: HomeComponent,
        children: [
            {
                path: 'example',
                component: ExampleComponent,
            },
        ],
    },    

    { path: '**', redirectTo: 'example' },
];
