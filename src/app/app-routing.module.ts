import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FightComponent, CatalogComponent} from "./pages";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'}, // path: '/'
    { path: 'catalog',  component: CatalogComponent },
    { path: 'fight/:pokemonId1/:pokemonId2',  component: FightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
