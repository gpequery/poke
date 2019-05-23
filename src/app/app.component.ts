import {Component, OnInit} from '@angular/core';
import {FightService, PokeApiService} from "./services";
import {Pokemon} from "./models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    constructor(private fightService: FightService) {}

    ngOnInit() {
        this.fightService.initPokemons();
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
