import { Component, OnInit } from '@angular/core';
import {FightService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private fightService: FightService, public router: Router) {}

    randomFight() {
        let pokemonId1 = Math.floor((Math.random() * 10) + 1);;
        let pokemonId2 = Math.floor((Math.random() * 10) + 1);;
        this.router.navigate(['/fight/' + pokemonId1 + '/' + pokemonId2 ]);
    }

    ngOnInit() {
    }

}
