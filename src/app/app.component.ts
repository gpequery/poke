import {Component} from '@angular/core';
import {FightService} from "./services";
import {Logs} from "./models/Logs";
import {Pokemon} from "./models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    pokemon1: Pokemon;
    pokemon2: Pokemon;

    pokemonList1: Array<Pokemon>;
    pokemonList2: Array<Pokemon>;

    logs: Array<Logs> = [];
    alreadyStart = false;
    isPlaying = false;

    constructor(private fightService: FightService) {
        this.init();
    }

    init(){
        this.pokemonList1 = this.fightService.pokemonRandomList();
        this.pokemonList2 = this.fightService.pokemonRandomList();
    }

    choosePokemon1(pokemon) {
        this.pokemon1 = pokemon;
    }

    choosePokemon2(pokemon) {
        this.pokemon2 = pokemon;
    }

    run() {
        this.isPlaying = true;
        this.alreadyStart = true;
        this.fightService.launchFight(this.pokemon1, this.pokemon2);
    }

    stop() {
        this.isPlaying = false;
        // TODO : stop Fight !
    }
}
