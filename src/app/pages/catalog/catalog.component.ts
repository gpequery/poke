import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FightService} from "../../services";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    pokemonId1: number = 55;
    pokemonId2: number = 66;

    constructor(private fightService: FightService, public router: Router) {}

    fight() {
        this.router.navigate(['/fight/' + this.pokemonId1 + '/' + this.pokemonId2 ]);
    }

    ngOnInit(): void {
    }
}
