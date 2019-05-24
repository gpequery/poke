import {Component, OnInit} from '@angular/core';
import {FightService, PokedexService} from "./services";
import {Player, Pokemon} from "./models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
    constructor(public fightService: FightService, private pokedexService: PokedexService) {}

    ngOnInit(): void {
       this.pokedexService.getPokemonById(1).subscribe(pokemon => {
           console.log(pokemon.family.label);
           this.fightService.player1.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(60).subscribe(pokemon => {
            console.log(pokemon.family.label);

            this.fightService.player1.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(4).subscribe(pokemon => {
            console.log(pokemon.family.label);
            this.fightService.player1.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(470).subscribe(pokemon => {
            console.log(pokemon.family.label);

            this.fightService.player1.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(2).subscribe(pokemon => {
            console.log(pokemon.family.label);

            this.fightService.player2.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(26).subscribe(pokemon => {
            this.fightService.player2.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(5).subscribe(pokemon => {
            this.fightService.player2.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(3).subscribe(pokemon => {
            this.fightService.player2.addPokemon(pokemon);
        });
        this.pokedexService.getPokemonById(4).subscribe(pokemon => {
            this.fightService.player2.addPokemon(pokemon);
        });
    }

    choosePokemon1(pokemon1) {
        pokemon1.prepareAttack();
        this.fightService.pokemon1 = pokemon1;
    }

    choosePokemon2(pokemon2) {
        pokemon2.prepareAttack();
        this.fightService.pokemon2 = pokemon2;
    }

    run() {
        this.fightService.run();
        // this.fightService.testRun();
    }

    stop() {
        this.fightService.stop();
        // this.fightService.testStop();
    }
}
