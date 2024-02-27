import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ArticleInterface } from '../interface/article.interface';
import { API_PATH } from '../shared/api-path';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {
	http = inject(HttpClient);
	constructor() { }

	getArticles(): Observable<{ articles: ArticleInterface[] }> {
		return this.http.get<{ articles: ArticleInterface[] }>(API_PATH.getArtical);
	}
}
