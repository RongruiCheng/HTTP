import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hero } from './hero';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from '../http-error-handler.service';

const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': 'my-auth-token'
 })
};

@Injectable({
  providedIn: 'root'
})
export class HerosService {
  herosUrl = 'api/heroes';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    public httpErrorHandler: HttpErrorHandlerService
    ) {
      // 封装的错误处理函数
      this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

  // getHeros from server
  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.herosUrl).pipe(

      catchError(this.handleError('getHeroes', []))

    );

  }
   /** POST: add a new hero to the database */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.herosUrl, hero, httpOptions).pipe(
      catchError(this.handleError('addHero', hero))
    );
  }
  /** DELETE : delete a hero from the database by id */
  deleteHero(id: number): Observable<{}> {
    const url = `${this.herosUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError('deleteHero'))
    );
  }
  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateHero(hero: Hero): Observable<Hero> {

    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Hero>(this.herosUrl, hero, httpOptions).pipe(
      catchError(this.handleError('updateHero', hero))
    );
  }

  /** GET: heroes whose name contains search term */
  searchHero(term: string): Observable<Hero[]> {
    term = term.trim();
    // 设置查询字符串
    // api/heroes/?name=term
    const option = term ? { params : new HttpParams().set('name', term)} : {} ;

    return this.http.get<Hero[]>(this.herosUrl, option).pipe(
      catchError(this.handleError('searchHero', []))
    );
  }
}
