import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
 
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroService }          from './hero.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
 
import { AppRoutingModule }     from './app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';

// Add the FormsModule to the @NgModule metadata's imports array, which contains a list of external modules that the app needs.
// This allows us to put a form on the heroes html for editing and input.

// The ngModel directive binds an input , select , textarea (or custom form control) to a property on the scope 
// using NgModelController, which is created and exposed by this directive. 
// ngModel is responsible for: Binding the view into the model, which other directives such as input , 
// textarea or select require.

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
)
  ],                //The providers array tells Angular to create a single, shared instance of HeroService and inject into any class that asks for it.
  providers: [  
    HeroService, MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }