import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	currentUserSignal = signal<UserInterface | undefined | null>(undefined)
    isUserLoggedIn = signal<boolean>(false);
}
