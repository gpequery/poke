import {Component} from '@angular/core';
import {Attack, Family, Pokemon} from './models';
import {FightService} from "./services";
import {Logs} from "./models/Logs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(private fightService: FightService) {
        // this.lunchFight();
        fightService.test();
    }

    normalFamily = new Family('Normal', 'secondary');
    fireFamily = new Family('Fire', 'danger');
    waterFamily = new Family('Water', 'info');
    plantFamily = new Family('Plant', 'success');
    electricFamily = new Family('Electric', 'warning');

    fireAttacks: Array<Attack> = [
        new Attack('Feu Follet', 7, 25, this.fireFamily),
        new Attack('Tacle feu', 2, 19, this.fireFamily),
        new Attack('Picanon', -2, 8, this.normalFamily),
        new Attack('Feu follet', -3, 6, this.fireFamily),
        new Attack('Croc de mort', -7, 0, this.normalFamily)
    ];

    watterAttacks: Array<Attack> = [
        new Attack('Hydrocanon', 6, 24, this.waterFamily),
        new Attack('Cascade', 1, 16, this.waterFamily),
        new Attack('Picanon', -2, 8, this.normalFamily),
        new Attack('Siphon', -4, 4, this.waterFamily),
        new Attack('Croc de mort', -7, 0, this.normalFamily)
    ];

    electricAttacks: Array<Attack> = [
        new Attack('Eclair', 5, 23, this.electricFamily),
        new Attack('Etincelle', 0, 13, this.electricFamily),
        new Attack('Picanon', -2, 8, this.normalFamily),
        new Attack('Onde de choc', -5, 2, this.electricFamily),
        new Attack('Croc de mort', -7, 0, this.normalFamily)
    ];

    plantAttacks: Array<Attack> = [
        new Attack('Fouet liagne', 4, 22, this.plantFamily),
        new Attack('Spore', -1, 10, this.plantFamily),
        new Attack('Picanon', -2, 8, this.normalFamily),
        new Attack('Fulmigraine', -6, 1, this.plantFamily),
        new Attack('Croc de mort', -7, 0, this.normalFamily)
    ];

    normalAttacks: Array<Attack> = [
        new Attack('Feu Follet', 7, 25, this.fireFamily),
        new Attack('Eclair', 5, 23, this.electricFamily),
        new Attack('Fouet liagne', 4, 22, this.plantFamily),
        new Attack('Triplattaque', 3, 20, this.normalFamily),
        new Attack('Picanon', -2, 8, this.normalFamily),
        new Attack('Croc de mort', -7, 0, this.normalFamily)
    ];

    pokemonList1: Array<Pokemon> = [
        new Pokemon('Dracaufeu', 5, this.fireFamily, this.fireAttacks),
        new Pokemon('Magicarpe', 20, this.waterFamily, this.watterAttacks),
        new Pokemon('Caterpie', 10, this.plantFamily, this.plantAttacks),
        new Pokemon('Voltali', 15, this.electricFamily, this.electricAttacks),
    ];

    pokemonList2: Array<Pokemon> = [
        new Pokemon('Chetiflor', 5, this.plantFamily, this.plantAttacks),
        new Pokemon('Roucool', 20, this.normalFamily, this.normalAttacks),
        new Pokemon('Magmar', 10, this.fireFamily, this.fireAttacks),
        new Pokemon('Tentacool', 15, this.waterFamily, this.watterAttacks),
    ];

    title = 'poke';
    pokemon1: Pokemon;
    pokemon2: Pokemon;
    logs: Array<Logs> = [];
    alreadyStart = false;
    isPlaying = false;

    choosePokemon1(pokemon) {
        this.pokemon1 = pokemon;
    }

    choosePokemon2(pokemon) {
        this.pokemon2 = pokemon;
    }

    run() {
        this.isPlaying = true;
        this.alreadyStart = true;
        this.lunchFight();
    }

    stop() {
        this.isPlaying = false;
        // TODO : stop Fight !
    }

    lunchFight() {
        while (this.pokemon1.life > 0 && this.pokemon2.life > 0) {
            this.pokemon1.prepareAttack();
            this.pokemon2.prepareAttack();

            let firstPokemon = this.pokemon1.isFirstToAttack(this.pokemon2) ? this.pokemon1 : this.pokemon2;
            let secondPokemon = firstPokemon == this.pokemon1 ? this.pokemon2 : this.pokemon1;

            this.addAttackLog(firstPokemon);

            if (firstPokemon.attack(secondPokemon)) {
                this.addWinnerLog(firstPokemon);
            }

            if (secondPokemon.life > 0) {
                this.addAttackLog(secondPokemon);

                if (secondPokemon.attack(firstPokemon)) {
                    this.addWinnerLog(secondPokemon);
                }
            }
        }
    }

    addAttackLog(pokemon: Pokemon): void {
        this.logs.push(new Logs(pokemon, pokemon.currentAttack.label, pokemon.currentAttack.family.className,false));
        // this.addLog(`<span class="text-${pokemon.family.className}">${pokemon.name}</span> attaque  <span class="text-${pokemon.currentAttack.family.className}">${pokemon.currentAttack.label}</span>`)
    }

    addWinnerLog(pokemon: Pokemon) {
        this.logs.push(new Logs(pokemon, pokemon.currentAttack.label,  pokemon.currentAttack.family.className, true));
        // this.addLog(`<h2>${pokemon.name} Win</h2>`)
    }

    addLog(message: string) {
        // this.logs.push(message);
    }
}
