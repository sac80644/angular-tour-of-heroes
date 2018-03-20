import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  //The searchTerms property is declared as an RxJS Subject.
  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  //You can also push values into that Observable by calling its next(value) method as the search() method does.

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      //switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged. 
      //It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}