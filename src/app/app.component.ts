import {Component} from '@angular/core';
import {Attack, Pokemon} from "./models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor() {
        this.lunchFight();
    }

    title = 'poke';

    attacks: Array<Attack> = [
        new Attack('Poursuite', 7, 25),
        new Attack('Switch', 6, 24),
        new Attack('Coup D\'Main', 5, 23),
        new Attack('Reflet Magik', 4, 22),
        new Attack('Prévention', 3, 20),
        new Attack('Ruse', 2, 19),
        new Attack('Coup Bas', 1, 16),
        new Attack('Déplacement', 0, 13),
        new Attack('Corps Perdu', -1, 10),
        new Attack('Aucune', -2, 8),
        new Attack('Mitra-Poing', -3, 6),
        new Attack('Avalanche', -4, 4),
        new Attack('Riposte', -5, 2),
        new Attack('Cyclone', -6, 1),
        new Attack('Distorsion', -7, 0)
    ];

    pokemon1 = new Pokemon('Greg', 10, this.attacks);
    pokemon2 = new Pokemon('Juan', 20, this.attacks);
    logs = '';

    test() {
        this.pokemon1.life = 0;
        console.log('Test');
    }

    lunchFight() {
        while (this.pokemon1.life > 0 && this.pokemon2.life > 0) {
            let pokemon1Attack = this.pokemon1.getRandomAttack();
            let pokemon2Attack = this.pokemon2.getRandomAttack();

            let firstPokemon = this.pokemon1.isFirstToAttack(pokemon1Attack, pokemon2Attack, this.pokemon2) ? this.pokemon1 : this.pokemon2;
            let secondPokemon = firstPokemon === this.pokemon2 ? this.pokemon1 : this.pokemon2;

            if (firstPokemon.isFirstToAttack(pokemon1Attack, pokemon2Attack, secondPokemon)) {
                this.printAttack(firstPokemon, pokemon1Attack);

                if (firstPokemon.attack(secondPokemon, pokemon1Attack)) {
                    this.printWinner(firstPokemon);
                }

                if (secondPokemon.life >= 0) {
                    this.printAttack(secondPokemon, pokemon2Attack);

                    if (secondPokemon.attack(this.pokemon1, pokemon2Attack)) {
                        this.printWinner(secondPokemon);
                    }
                }
            }
        }
    }

    printAttack(pokemon: Pokemon, attack: Attack): void {
        this.logs += `<p>${pokemon.name} attaque  ${attack.label}</p>`;
    }

    printWinner(pokemon: Pokemon): void {
        this.logs += `${pokemon.name} Win`;
    }
}
