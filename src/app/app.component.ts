import {Component} from '@angular/core';
import {FightService} from "./services";
import {Logs} from "./models/Logs";
import {Player, Pokemon} from "./models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    pokemon1: Pokemon;
    pokemon2: Pokemon;

    constructor(private fightService: FightService) {}

    choosePokemon1(pokemon) {
        this.pokemon1 = pokemon;
    }

    choosePokemon2(pokemon) {
        this.pokemon2 = pokemon;
    }

    run() {
        this.fightService.launchFight(this.pokemon1, this.pokemon2);
    }

    stop() {
        this.fightService.stop();
    }
}
