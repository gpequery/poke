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
    fightInterval;

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
        this.fightService.launchFight(this.pokemon1, this.pokemon2, this.fightInterval, this.isPlaying);
    }

    stop() {
        this.fightService.stop(this.isPlaying, this.fightInterval);
    }

    // fightLoop(currentPokemon: Pokemon) {
    //     let otherPokemon: Pokemon = currentPokemon === this.pokemon1 ? this.pokemon2 : this.pokemon1;
    //
    //     if (!otherPokemon.isDead()) {
    //         this.addAttackLog(currentPokemon);
    //         currentPokemon.attack(otherPokemon);
    //
    //         if (otherPokemon.isDead()) {
    //             this.addWinnerLog(currentPokemon);
    //             this.stop();
    //         }
    //     }
    // }

    // lunchFight() {
    //     let currentPokemon;
    //     let i = 0;
    //     this.fightInterval= setInterval(() => {
    //         if (i%2 === 0) {
    //             this.pokemon1.prepareAttack();
    //             this.pokemon2.prepareAttack();
    //             currentPokemon = this.pokemon1.isFirstToAttack(this.pokemon2) ? this.pokemon1 : this.pokemon2;
    //         } else {
    //             currentPokemon = currentPokemon === this.pokemon1 ? this.pokemon2 : this.pokemon1;
    //         }
    //
    //         this.fightLoop(currentPokemon);
    //         i++;
    //     }, 1000);
    // }

    addAttackLog(pokemon: Pokemon): void {
        console.log('t');
        console.log(pokemon.name);
        this.logs.push(new Logs(pokemon, pokemon.currentAttack.label, pokemon.currentAttack.family.className, false));
    }

    addWinnerLog(pokemon: Pokemon) {
        this.logs.push(new Logs(pokemon, pokemon.currentAttack.label, pokemon.currentAttack.family.className, true));
    }
}
