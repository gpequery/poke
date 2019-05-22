import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { PCustomBgColor } from './directives';
import {PkmDataComponent, PokemonListComponent, LogsComponent} from './components';
import {FightService} from "./services";
// import { LogColorDirective } from './log-color.directive';

@NgModule({
    declarations: [
        AppComponent,
        PkmDataComponent,
        PokemonListComponent,
        PCustomBgColor,
        LogsComponent
    ],
    providers: [
        FightService,
        ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    exports: [
        PCustomBgColor
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
