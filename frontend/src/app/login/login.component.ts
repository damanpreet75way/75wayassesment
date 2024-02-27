import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserInterface } from '../interface/user.interface';
import { AuthService } from '../service/auth.service';
import { API_PATH } from '../shared/api-path';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    form = inject(FormBuilder);
	http = inject(HttpClient);
	authService = inject(AuthService);
	router = inject(Router);

	loginForm = this.form.nonNullable.group({
		email : ['user2@mail.com', Validators.required],
		password: ['12345678', Validators.required]
	})

	onSubmit(): void {
		this.http.post<{data: any}>(API_PATH.loginUrl, {
			email:this.loginForm.value.email,
			password:this.loginForm.value.password
		}).subscribe((res) => {
			console.log("res",res)
			
			localStorage.setItem('accessToken', res.data.accessToken);
			localStorage.setItem('refreshToken', res.data.refreshToken);
			localStorage.setItem('user',res.data.user);
			this.authService.currentUserSignal.set(res.data.user);
			if(res.data.user) this.authService.isUserLoggedIn.set(true);
			this.router.navigateByUrl('/');
		});
		this.loginForm.reset();
	}
}
