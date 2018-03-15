import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

// Add the FormsModule to the @NgModule metadata's imports array, which contains a list of external modules that the app needs.
// This allows us to put a form on the heroes html for editing and input.

// The ngModel directive binds an input , select , textarea (or custom form control) to a property on the scope 
// using NgModelController, which is created and exposed by this directive. 
// ngModel is responsible for: Binding the view into the model, which other directives such as input , 
// textarea or select require.

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }