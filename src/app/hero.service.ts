import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
 
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

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
  constructor(private messageService: MessageService) { }

  //In this tutorial, you'll simulate getting data from the server with the RxJS of() function.
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  //Modify the getHeroes method to send a message when the heroes are fetched.
  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
  
  //The HeroService.getHeroes() method has a synchronous signature which when using a mock you can get away with
  //but if the data is coming from a database for example, the data will not be immediately available 
  //and the browser will not wait, so...
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

}
