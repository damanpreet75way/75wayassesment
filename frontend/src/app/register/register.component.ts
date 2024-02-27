import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { API_PATH } from '../shared/api-path';
import { UserInterface } from '../interface/user.interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
	form = inject(FormBuilder);
	http = inject(HttpClient);
	authService = inject(AuthService);
	router = inject(Router);

	registrationForm = this.form.nonNullable.group({
		username : ['user6', Validators.required],
		email : ['user6@mail.com', Validators.required],
		password: ['12345678', Validators.required]
	})

	onSubmit(): void {
		// console.log('we are here', this.registrationForm.getRawValue())
		this.http.post<any>(API_PATH.registerUrl, {
			email:this.registrationForm.value.email,
			password:this.registrationForm.value.password,
			username:this.registrationForm.value.username
		}).subscribe((res) => {
			console.log(res.data)
			localStorage.setItem('user', res.data.user);
			// this.authService.currentUserSignal.set(res.user);
			this.router.navigateByUrl('/login')
		});
		this.registrationForm.reset();
	}
}
