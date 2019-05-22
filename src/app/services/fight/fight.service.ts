import {Injectable} from '@angular/core';
import {Attack, Family, Pokemon} from "../../models";

@Injectable({
    providedIn: 'root'
})
export class FightService  {

    normalFamily: Family;
    normalAttacks: Array<Attack>;
    fireFamily: Family;
    fireAttacks: Array<Attack>;
    waterFamily: Family;
    watterAttacks: Array<Attack>;
    plantFamily: Family;
    plantAttacks: Array<Attack>;
    electricFamily: Family;
    electricAttacks: Array<Attack>;

    pokemonsList: Array<Pokemon>;
    private logs = [];


    constructor() {
        this.initData()
    }

    initData() {
        this.normalFamily = new Family('Normal', 'secondary');
        this.fireFamily = new Family('Fire', 'danger');
        this.waterFamily = new Family('Water', 'info');
        this.plantFamily = new Family('Plant', 'success');
        this.electricFamily = new Family('Electric', 'warning');

        this.fireAttacks = [
            new Attack('Feu Follet', 7, 25, this.fireFamily),
            new Attack('Tacle feu', 2, 19, this.fireFamily),
            new Attack('Picanon', -2, 8, this.normalFamily),
            new Attack('Feu follet', -3, 6, this.fireFamily),
            new Attack('Croc de mort', -7, 0, this.normalFamily)
        ];

        this.watterAttacks = [
            new Attack('Hydrocanon', 6, 24, this.waterFamily),
            new Attack('Cascade', 1, 16, this.waterFamily),
            new Attack('Picanon', -2, 8, this.normalFamily),
            new Attack('Siphon', -4, 4, this.waterFamily),
            new Attack('Croc de mort', -7, 0, this.normalFamily)
        ];

        this.electricAttacks = [
            new Attack('Eclair', 5, 23, this.electricFamily),
            new Attack('Etincelle', 0, 13, this.electricFamily),
            new Attack('Picanon', -2, 8, this.normalFamily),
            new Attack('Onde de choc', -5, 2, this.electricFamily),
            new Attack('Croc de mort', -7, 0, this.normalFamily)
        ];

        this.plantAttacks = [
            new Attack('Fouet liagne', 4, 22, this.plantFamily),
            new Attack('Spore', -1, 10, this.plantFamily),
            new Attack('Picanon', -2, 8, this.normalFamily),
            new Attack('Fulmigraine', -6, 1, this.plantFamily),
            new Attack('Croc de mort', -7, 0, this.normalFamily)
        ];

        this.normalAttacks = [
            new Attack('Feu Follet', 7, 25, this.fireFamily),
            new Attack('Eclair', 5, 23, this.electricFamily),
            new Attack('Fouet liagne', 4, 22, this.plantFamily),
            new Attack('Triplattaque', 3, 20, this.normalFamily),
            new Attack('Picanon', -2, 8, this.normalFamily),
            new Attack('Croc de mort', -7, 0, this.normalFamily)
        ];

        this.pokemonsList = [
            new Pokemon('Dracaufeu', 5, this.fireFamily, this.fireAttacks),
            new Pokemon('Magicarpe', 20, this.waterFamily, this.watterAttacks),
            new Pokemon('Caterpie', 10, this.plantFamily, this.plantAttacks),
            new Pokemon('Voltali', 15, this.electricFamily, this.electricAttacks),
            new Pokemon('Chetiflor', 5, this.plantFamily, this.plantAttacks),
            new Pokemon('Roucool', 20, this.normalFamily, this.normalAttacks),
            new Pokemon('Magmar', 10, this.fireFamily, this.fireAttacks),
            new Pokemon('Tentacool', 15, this.waterFamily, this.watterAttacks)
        ];
    }

    pokemonRandomList(): any{
        let pokemonsReturnList: Array<Pokemon> = [];

        for(let i=0; i<4; i++) {
            pokemonsReturnList.push(this.pokemonsList[this.randomValue()]);
        }

        return pokemonsReturnList;
    }

    randomValue(): any{
        return Math.floor(Math.random() * Math.floor(this.pokemonsList.length))
    }

    addLog(message: string) {
        this.logs.push(message)
    }

    addAttackLog(pokemon: Pokemon): void {
        this.addLog(`<span class="text-${pokemon.family.className}">${pokemon.name}</span> attaque  <span class="text-${pokemon.currentAttack.family.className}">${pokemon.currentAttack.label}</span>`)
    }

    addWinnerLog(pokemon: Pokemon) {
        this.addLog(`<h2>${pokemon.name} Win</h2>`)
    }

    stop(isPlaying: boolean, fightInterval: number) {
        isPlaying = false;
        clearInterval(fightInterval);
    }

    fightLoop(pokemon1: Pokemon, pokemon2: Pokemon, currentPokemon: Pokemon, fightInterval: number, isPlaying: boolean) {
        let otherPokemon: Pokemon = currentPokemon === pokemon1 ? pokemon2 : pokemon1;

        if (!otherPokemon.isDead()) {
            this.addAttackLog(currentPokemon);
            currentPokemon.attack(otherPokemon);

            if (otherPokemon.isDead()) {
                this.addWinnerLog(currentPokemon);
                this.stop(isPlaying, fightInterval);
            }
        }
    }

    launchFight(pokemon1: Pokemon, pokemon2: Pokemon, fightInterval: number, isPlaying: boolean){
        let currentPokemon;
        let i = 0;
        fightInterval = setInterval(() => {
            if (i%2 === 0) {
                pokemon1.prepareAttack();
                pokemon2.prepareAttack();
                currentPokemon = pokemon1.isFirstToAttack(pokemon2) ? pokemon1 : pokemon2;
            } else {
                currentPokemon = currentPokemon === pokemon1 ? pokemon2 : pokemon1;
            }

            this.fightLoop(pokemon1, pokemon2, currentPokemon, fightInterval, isPlaying);
            i++;
        }, 1000);
    }
}
