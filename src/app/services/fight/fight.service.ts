import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Attack, Family, Pokemon, Logs, Player} from "../../models";
import { Observable, Subscription} from "rxjs";
import {PokeApiService} from "../pokeApi/poke-api.service";

@Injectable({
    providedIn: 'root'
})
export class FightService implements OnDestroy {
    player1: Player;
    player2: Player;
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

    pokemonsList: Pokemon[];

    constructor(private pokeApiService: PokeApiService) {
        // this.initData();
        this.initPokemons();
    }

    initPokemons() {
        this.pokemonsList = this.pokeApiService.initPokemon();
        console.log(this.pokemonsList);
        console.log(this.pokemonsList[0]);
        console.log(this.pokemonsList);


        console.log('before');
        for (const p of this.pokemonsList) console.log(p);
        console.log('after');


        this.player1 = new Player('player 1');
        this.player2 = new Player('player 2');
        this.initPlayerPokemons();

        // console.log('INIT PLAYER ');
        // console.log(this.player1.pokemons);
    }

    initPlayerPokemons() {
        // this.player1.addPokemon(this.pokemonsList[0]);
        // this.player1.addPokemon(this.pokemonsList[1]);
        // this.player2.addPokemon(this.pokemonsList[2]);
        // this.player2.addPokemon(this.pokemonsList[3]);
    }

    addAttackLog(currentPokemon: Pokemon, attackData: any): void {
        this.logs.push(new Logs(currentPokemon, currentPokemon.currentAttack.label, currentPokemon.currentAttack.family.className, attackData,false));
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
            let attackData = currentPokemon.attack(otherPokemon);
            this.addAttackLog(currentPokemon, attackData);

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
