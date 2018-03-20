import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
 
import { Hero } from './hero';
import { HEROES } from './mock-heroes';   //Mock
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';  //To catch errors, you "pipe" the observable result from http.get()

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//HeroService.getHeroes() must have an asynchronous signature of some kind.
//It can take a callback. It could return a Promise. It could return an Observable.
//In this tutorial, HeroService.getHeroes() will return an Observable in part because 
//it will eventually use the Angular HttpClient.get method to fetch the heroes and HttpClient.get() returns an Observable.
//Observable is one of the key classes in the RxJS library.

//The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.
//Removing data access from components means you can change your mind about the implementation anytime, without touching any components. They don't know how the service works.
//The implementation in this tutorial will continue to deliver mock heroes.

@Injectable()  //The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
export class HeroService {

  //This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    private heroesUrl = 'api/heroes';  // URL to web api

  //In this tutorial, you'll simulate getting data from the server with the RxJS of() function.
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  //Modify the getHeroes method to send a message when the heroes are fetched.
  getHeroes (): Observable<Hero[]> {
    //commented out because we now are using the RxJS tap operator which looks at the observable values, does something with those values, and passes them along.
    // this.messageService.add('HeroService: fetched heroes');

    //The HeroService methods will tap into the flow of observable values and send a message (via log()) to the message area at the bottom of the page.
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  //Used Mock
  // getHero(id: number): Observable<Hero> {
  //   // Todo: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  //Using HTTP
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
  
  //The HeroService.getHeroes() method has a synchronous signature which when using a mock you can get away with
  //but if the data is coming from a database for example, the data will not be immediately available 
  //and the browser will not wait, so...
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

}
