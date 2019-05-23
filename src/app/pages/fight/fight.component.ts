import { Component, OnInit } from '@angular/core';
import {FightService} from "../../services";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss'],
})
export class FightComponent implements OnInit {
    pokemonId1: number;
    pokemonId2: number;

    constructor(private fightService: FightService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params
            .subscribe((params: Params): void => {
                this.pokemonId1 = Number(params.pokemonId1);
                this.pokemonId2 = Number(params.pokemonId2);
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
