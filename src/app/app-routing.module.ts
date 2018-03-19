import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

// import { CommonModule } from '@angular/common';

// You generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.
// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })


const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],  //The forRoot() method configures the router at the application's root level. 
                                              //The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
