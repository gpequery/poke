import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PkmDataComponent, PokemonListComponent, LogsComponent} from './components';
// import { LogColorDirective } from './log-color.directive';

@NgModule({
    declarations: [
        AppComponent,
        PkmDataComponent,
        PokemonListComponent,
        LogsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
