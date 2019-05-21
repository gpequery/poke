import { Component } from '@angular/core';
import {Pokemon, Attack} from "./models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
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

  pokemon1: Pokemon = new Pokemon('Greg', 10, this.attacks);
  pokemon2: Pokemon = new Pokemon('Juan', 20, this.attacks);
}
