import {Injectable, OnDestroy} from '@angular/core';
import {Attack, Family, Pokemon, Logs, Player} from "../../models";
import {interval, Observable, Subscription, fromEvent, merge} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FightService implements OnDestroy {
    player1: Player;
    player2: Player;
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
    logs: Array<Logs> = [];
    alreadyStart: boolean;
    isPlaying = false;
    startDate: Date;
    endDate: Date;
    winner: Player;
    round: number = -1;
    fightSubscription: Subscription;
    fightObservable: Observable<any>;
    pokemon1: Pokemon;
    pokemon2: Pokemon;

    pokemonsList: Array<Pokemon>;

    constructor() {
        this.initData();
    }

    initData() {
        this.player1 = new Player('player 1');
        this.player2 = new Player('player 2');

        this.normalFamily = new Family('Normal', 'secondary');
        this.fireFamily = new Family('Fire', 'danger');
        this.waterFamily = new Family('Water', 'info');
        this.plantFamily = new Family('Plant', 'success');
        this.electricFamily = new Family('Electric', 'warning');

        this.waterFamily.addWeakFamilies(this.fireFamily);
        this.fireFamily.addWeakFamilies(this.plantFamily);
        this.plantFamily.addWeakFamilies(this.waterFamily);
        this.electricFamily.addWeakFamilies(this.waterFamily);

        this.fireAttacks = [
            new Attack('Feu Follet', 7, 25.2, this.fireFamily),
            new Attack('Tacle feu', 2, 19.4, this.fireFamily),
            new Attack('Picanon', -2, 8.6, this.normalFamily),
            new Attack('Feu follet', -3, 6.7, this.fireFamily),
            new Attack('Croc de mort', -7, 0.5, this.normalFamily)
        ];

        this.watterAttacks = [
            new Attack('Hydrocanon', 6, 24.1, this.waterFamily),
            new Attack('Cascade', 1, 16.9, this.waterFamily),
            new Attack('Picanon', -2, 8.4, this.normalFamily),
            new Attack('Siphon', -4, 4.4, this.waterFamily),
            new Attack('Croc de mort', -7, 0.9, this.normalFamily)
        ];

        this.electricAttacks = [
            new Attack('Eclair', 5, 23.1, this.electricFamily),
            new Attack('Etincelle', 0, 13.6, this.electricFamily),
            new Attack('Picanon', -2, 8.3, this.normalFamily),
            new Attack('Onde de choc', -5, 2.5, this.electricFamily),
            new Attack('Croc de mort', -7, 0.9, this.normalFamily)
        ];

        this.plantAttacks = [
            new Attack('Fouet liagne', 4, 22.1, this.plantFamily),
            new Attack('Spore', -1, 10.4, this.plantFamily),
            new Attack('Picanon', -2, 8.6, this.normalFamily),
            new Attack('Fulmigraine', -6, 1.4, this.plantFamily),
            new Attack('Croc de mort', -7, 0.8, this.normalFamily)
        ];

        this.normalAttacks = [
            new Attack('Feu Follet', 7, 25.1, this.fireFamily),
            new Attack('Eclair', 5, 23.5, this.electricFamily),
            new Attack('Fouet liagne', 4, 22.3, this.plantFamily),
            new Attack('Triplattaque', 3, 20.7, this.normalFamily),
            new Attack('Picanon', -2, 8.6, this.normalFamily),
            new Attack('Croc de mort', -7, 0.9, this.normalFamily)
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

        this.initPlayerPokemons();
    }

    initPlayerPokemons() {
        this.player1.addPokemon(this.pokemonsList[0]);
        this.player1.addPokemon(this.pokemonsList[1]);
        this.player1.addPokemon(this.pokemonsList[2]);
        this.player1.addPokemon(this.pokemonsList[3]);

        this.player2.addPokemon(this.pokemonsList[4]);
        this.player2.addPokemon(this.pokemonsList[5]);
        this.player2.addPokemon(this.pokemonsList[6]);
        this.player2.addPokemon(this.pokemonsList[7]);
    }

    addAttackLog(currentPokemon: Pokemon, bonusDamage: boolean): void {
        this.logs.push(new Logs(currentPokemon, currentPokemon.currentAttack.label, currentPokemon.currentAttack.family.className, bonusDamage,false));
    }

    addPokemonDeadLog(pokemon: Pokemon) {
        this.logs.push(new Logs(pokemon, pokemon.currentAttack.label, pokemon.currentAttack.family.className, null, true));
    }

    stop() {
        this.isPlaying = false;
        this.fightSubscription.unsubscribe();

        if (this.isEnd()) {
            this.winner = this.getWinner();
            this.endDate = new Date();
        }
    }

    run() {
        this.isPlaying = true;

        if (!this.alreadyStart) {
            this.startDate = new Date();
            this.alreadyStart = true;

            this.fightObservable = new Observable(observer => {
                let currentPokemon: Pokemon;

                const interval = setInterval(() => observer.next(currentPokemon = this.getNextPokemon(currentPokemon)), 50);
                return () => {
                    observer.complete();
                    clearInterval(interval);
                };
            });
        }

        this.launchObserver();
    }

    getNextPokemon(currentPokemon: Pokemon): Pokemon {
        if (++this.round%2 === 0) {
            this.pokemon1.prepareAttack();
            this.pokemon2.prepareAttack();

            return this.pokemon1.isFirstToAttack(this.pokemon2) ? this.pokemon1 : this.pokemon2;
        } else {
            return currentPokemon === this.pokemon1 ? this.pokemon2 : this.pokemon1;
        }
    }

    launchObserver() {
        this.fightSubscription = this.fightObservable.subscribe(currentPokemon => {
            this.fightLoop(currentPokemon);
        });
    }

    fightLoop(currentPokemon: Pokemon) {
        let otherPokemon: Pokemon = currentPokemon === this.pokemon1 ? this.pokemon2 : this.pokemon1;

        if (!currentPokemon.isDead() && !otherPokemon.isDead()) {
            this.addAttackLog(currentPokemon, currentPokemon.currentAttack.isStrong(otherPokemon));
            currentPokemon.attack(otherPokemon);

            if (otherPokemon.isDead()) {
                this.addPokemonDeadLog(otherPokemon);
                this.stop();
            }
        }
    }

    getWinner() {
        return this.player1.haveAlivePokemon() ? this.player1 : this.player2
    }

    isEnd() {
        return !this.player1.haveAlivePokemon() || !this.player2.haveAlivePokemon();
    }

    ngOnDestroy() { this.fightSubscription.unsubscribe(); }
}
