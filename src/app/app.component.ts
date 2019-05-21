import {Component} from '@angular/core';
import {Attack, Pokemon} from './models';
import {Family} from './enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor() {
        this.lunchFight();
    }

    attacks: Array<Attack> = [
        new Attack('Feu Follet', 7, 25, Family.FIRE),
        new Attack('Hydrocanon', 6, 24, Family.WATER),
        new Attack('Eclair', 5, 23, Family.ELECTRIC),
        new Attack('Fouet liagne', 4, 22, Family.PLANT),
        new Attack('Triplattaque', 3, 20, Family.NORMAL),
        new Attack('Tacle feu', 2, 19, Family.FIRE),
        new Attack('Cascade', 1, 16, Family.WATER),
        new Attack('Etincelle', 0, 13, Family.ELECTRIC),
        new Attack('Spore', -1, 10, Family.PLANT),
        new Attack('Picanon', -2, 8, Family.NORMAL),
        new Attack('Feu follet', -3, 6, Family.FIRE),
        new Attack('Siphon', -4, 4, Family.WATER),
        new Attack('Onde de choc', -5, 2, Family.ELECTRIC),
        new Attack('Fulmigraine', -6, 1, Family.PLANT),
        new Attack('Croc de mort', -7, 0, Family.NORMAL)
    ];

    pokemonList1: Array<Pokemon> = [
        new Pokemon('Dracaufeu', 5, Family.FIRE, this.attacks),
        new Pokemon('Magicarpe', 20, Family.WATER, this.attacks),
        new Pokemon('Caterpie', 10, Family.PLANT, this.attacks),
        new Pokemon('Voltali', 15, Family.ELECTRIC, this.attacks),
    ];

    pokemonList2: Array<Pokemon> = [
        new Pokemon('Chetiflor', 5, Family.PLANT, this.attacks),
        new Pokemon('Roucool', 20, Family.NORMAL, this.attacks),
        new Pokemon('Magmar', 10, Family.FIRE, this.attacks),
        new Pokemon('Tentacool', 15, Family.WATER, this.attacks),
    ];

    title = 'poke';
    pokemon1: Pokemon;
    pokemon2: Pokemon;
    logs = '';
    isPlaying = false;


    choosePokemon1(pokemon) {
        this.pokemon1 = pokemon;
    }

    choosePokemon2(pokemon) {
        this.pokemon2 = pokemon;
    }

    run() {
        this.isPlaying = true;
        // TODO : lunch Fight !
    }

    stop() {
        this.isPlaying = false;
        // TODO : stop Fight !
    }

    lunchFight() {
        // TODO remove two line under this comment
        this.pokemon1 = new Pokemon('Dracaufeu', 5, Family.FIRE, this.attacks);
        this.pokemon2 = new Pokemon('Caterpie', 10, Family.PLANT, this.attacks);

        while (this.pokemon1.life > 0 && this.pokemon2.life > 0) {
            const pokemon1Attack = this.pokemon1.getRandomAttack();
            const pokemon2Attack = this.pokemon2.getRandomAttack();

            const firstPokemon = this.pokemon1.isFirstToAttack(pokemon1Attack, pokemon2Attack, this.pokemon2) ? this.pokemon1 : this.pokemon2;
            const secondPokemon = firstPokemon === this.pokemon2 ? this.pokemon1 : this.pokemon2;

            if (firstPokemon.isFirstToAttack(pokemon1Attack, pokemon2Attack, secondPokemon)) {
                this.printAttack(firstPokemon, pokemon1Attack);

                if (Pokemon.attack(secondPokemon, pokemon1Attack)) {
                    this.printWinner(firstPokemon);
                }

                if (secondPokemon.life > 0) {
                    this.printAttack(secondPokemon, pokemon2Attack);

                    if (Pokemon.attack(this.pokemon1, pokemon2Attack)) {
                        this.printWinner(secondPokemon);
                    }
                }
            }
        }
    }

    printAttack(pokemon: Pokemon, attack: Attack): void {
        this.logs += `<div><span class="text-${pokemon.family}">${pokemon.name}</span> attaque  <span class="text-${attack.family}">${attack.label}</span></div>`;
    }

    printWinner(pokemon: Pokemon): void {
        this.logs += `<h2>${pokemon.name} Win</h2>`;
    }
}
