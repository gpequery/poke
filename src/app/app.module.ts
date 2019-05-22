import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PCustomColor} from './directives';
import {LogsComponent, PkmDataComponent, PokemonListComponent} from './components';

// import { LogColorDirective } from './log-color.directive';

@NgModule({
    declarations: [
        AppComponent,
        PkmDataComponent,
        PokemonListComponent,
        PCustomColor,
        LogsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    exports: [
        PCustomColor
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
