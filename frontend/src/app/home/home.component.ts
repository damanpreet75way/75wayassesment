import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interface/user.interface';
import { API_PATH } from '../shared/api-path';
import { Router } from '@angular/router';
import { ArticleInterface } from '../interface/article.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../interface/appState.interface';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
	
}
