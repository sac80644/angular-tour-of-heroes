// You always import the Component symbol from the Angular core library and annotate the component class with @Component.
// @Component is a decorator function that specifies the Angular metadata for the component.

// The CLI generated three metadata properties:
// selector— the component's CSS element selector
// templateUrl— the location of the component's template file.
// styleUrls— the location of the component's private CSS styles.
// The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template.

// The ngOnInit is a lifecycle hook Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
// Always export the component class so you can import it elsewhere ... like in the AppModule.

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';  //mock

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  
  heroes = HEROES;  //public property for binding

  constructor() { }

  ngOnInit() {
  }

  // selectedHero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
