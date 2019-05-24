import {TestBed} from '@angular/core/testing';

import {FightService} from './fight.service';
import {Attack, Family, Logs, Pokemon} from "../../models";

describe('FightService', () => {
    let family1 = new Family('fire', 'success');
    let pokemon1 = new Pokemon('myName1', 50, family1, [new Attack('Feu Follet', 7, 25.2, family1)]);
    let pokemon2 = new Pokemon('myName2', 50, family1, [new Attack('Tacle feu', 2, 19.4, family1)]);

    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FightService = TestBed.get(FightService);
        expect(service).toBeTruthy();
    });

    it('should init player', () => {
        const service: FightService = TestBed.get(FightService);

        service.initData();

        expect(service.player1.name).toEqual('Player 1');
        expect(service.player2.name).toEqual('Player 2');
    });

    it('should init pokemon player', () => {
        const service: FightService = TestBed.get(FightService);

        service.initData();
        // service.initPlayerPokemons();

        expect(service.player1.pokemons.length).toBeGreaterThan(0);
        expect(service.player2.pokemons.length).toBeGreaterThan(0);

        expect(service.player1.pokemons.length).toEqual(service.player2.pokemons.length);
    });

    it('should add attack Logs', () => {
        const service: FightService = TestBed.get(FightService);

        pokemon1.prepareAttack();
        service.addAttackLog(pokemon1, [50, 2]);

        expect(service.logs.length).toEqual(1);
        expect(service.logs[0].pokemon).toEqual(pokemon1);
        expect(service.logs[0].attackLabel).toEqual(pokemon1.currentAttack.label);
        expect(service.logs[0].attackFamilyClass).toEqual(pokemon1.currentAttack.family.className);
        expect(service.logs[0].isWinnerMessage).toBeFalsy();

        pokemon2.prepareAttack();
        service.addAttackLog(pokemon2, [25, 1]);

        expect(service.logs.length).toEqual(2);
        expect(service.logs[0].pokemon).toEqual(pokemon1);
        expect(service.logs[0].attackLabel).toEqual(pokemon1.currentAttack.label);
        expect(service.logs[0].attackFamilyClass).toEqual(pokemon1.currentAttack.family.className);
        expect(service.logs[0].isWinnerMessage).toBeFalsy();
        expect(service.logs[0].attackData[0]).toEqual(50);
        expect(service.logs[0].attackData[1]).toEqual(2);

        expect(service.logs[1].pokemon).toEqual(pokemon2);
        expect(service.logs[1].pokemon).toEqual(pokemon2);
        expect(service.logs[1].attackLabel).toEqual(pokemon2.currentAttack.label);
        expect(service.logs[1].attackFamilyClass).toEqual(pokemon2.currentAttack.family.className);
        expect(service.logs[1].isWinnerMessage).toBeFalsy();
        expect(service.logs[1].attackData[0]).toEqual(25);
        expect(service.logs[1].attackData[1]).toEqual(1);
    });

    it('should add pokemon dead Logs', () => {
        const service: FightService = TestBed.get(FightService);

        pokemon1.prepareAttack();
        service.addPokemonDeadLog(pokemon1);

        expect(service.logs.length).toEqual(1);
        expect(service.logs[0].pokemon).toEqual(pokemon1);
        expect(service.logs[0].isWinnerMessage).toBeTruthy();
        expect(service.logs[0].attackData).toBeNull();

        pokemon2.prepareAttack();
        service.addPokemonDeadLog(pokemon2);

        expect(service.logs.length).toEqual(2);
        expect(service.logs[1].pokemon).toEqual(pokemon2);
        expect(service.logs[1].isWinnerMessage).toBeTruthy();
        expect(service.logs[1].attackData).toBeNull();
    });

    it('should run', () => {
        const service: FightService = TestBed.get(FightService);

        expect(service.isPlaying).toBeFalsy();
        expect(service.alreadyStart).toBeFalsy();
        expect(service.startDate).toBeUndefined();
        expect(service.fightObservable).toBeFalsy();
        expect(service.fightSubscription).toBeUndefined();
        console.log(service.startDate);

        service.run();

        expect(service.isPlaying).toBeTruthy();
        expect(service.alreadyStart).toBeTruthy();
        expect(service.startDate).toBeDefined();
        expect(service.fightObservable).toBeTruthy();
        expect(service.fightSubscription).toBeTruthy();
    });

    it('should stop', () => {
        const service: FightService = TestBed.get(FightService);

        service.run();

        expect(service.isPlaying).toBeTruthy();
        expect(service.alreadyStart).toBeTruthy();
        expect(service.fightObservable).toBeTruthy();
        expect(service.fightSubscription).toBeTruthy();

        service.stop();

        expect(service.isPlaying).toBeFalsy();
        expect(service.alreadyStart).toBeTruthy();
    });

    it('should get next pokemon', () => {
        const service: FightService = TestBed.get(FightService);

        service.pokemon1 = pokemon1;
        service.pokemon2 = pokemon2;

        pokemon1.prepareAttack();
        pokemon2.prepareAttack();

        service.round = 0;
        expect(service.getNextPokemon(pokemon1)).toEqual(pokemon2);
        expect(service.getNextPokemon(pokemon2)).toEqual(pokemon1);

        service.round = 1;
        expect(service.getNextPokemon(pokemon1)).toEqual(pokemon1);
        expect(service.getNextPokemon(pokemon2)).toEqual(pokemon1);
    });

    it('should get the winner', () => {
        const service: FightService = TestBed.get(FightService);

        service.initData();

        service.player1.pokemons.map(pokemon => pokemon.life = 0);
        service.player2.pokemons.map(pokemon => pokemon.life = 100);

        expect(service.getWinner()).toEqual(service.player2);

        service.player1.pokemons.map(pokemon => pokemon.life = 100);
        service.player2.pokemons.map(pokemon => pokemon.life = 0);

        expect(service.getWinner()).toEqual(service.player1);
    });

    it('should is end', () => {
        const service: FightService = TestBed.get(FightService);

        service.initData();

        service.player1.pokemons.map(pokemon => pokemon.life = 100);
        service.player2.pokemons.map(pokemon => pokemon.life = 100);
        expect(service.isEnd()).toBeFalsy();

        service.player1.pokemons[0].life = 0;
        expect(service.isEnd()).toBeFalsy();

        service.player1.pokemons.map(pokemon => pokemon.life = 0);
        service.player2.pokemons.map(pokemon => pokemon.life = 100);

        expect(service.isEnd()).toBeTruthy();

        service.player1.pokemons.map(pokemon => pokemon.life = 100);
        service.player2.pokemons.map(pokemon => pokemon.life = 0);

        expect(service.isEnd()).toBeTruthy();


    });
});
