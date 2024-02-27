import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protected route
    { path: '', redirectTo: 'home', pathMatch: 'full'}, // Redirect to home if logged in
    { path: '**', redirectTo: 'login' } // Redirect unmatched routes to login
];
