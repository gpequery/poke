import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PCustomColor} from './directives';
import {LogsComponent, PkmDataComponent, PokemonListComponent} from './components';

import {FightService, PokedexService} from "./services";

@NgModule({
    declarations: [
        AppComponent,
        PkmDataComponent,
        PokemonListComponent,
        PCustomColor,
        LogsComponent
    ],
    providers: [
        FightService,
        PokedexService
        ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        PCustomColor
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
