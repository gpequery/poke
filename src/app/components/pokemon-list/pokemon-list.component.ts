import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pokemon} from '../../models';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {
    constructor() {
        console.log('Greg');
        console.log(this.pokemonList);
    }

    @Input() pokemonList: Pokemon[];
    @Output() choosePokemon = new EventEmitter<Pokemon>();


    handleChange(selectedItem) {
        const pokemon: Pokemon = selectedItem;

        this.choosePokemon.emit(pokemon);
    }
}
