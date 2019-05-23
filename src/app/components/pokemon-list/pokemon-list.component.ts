import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pokemon} from '../../models';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {
    constructor() { }

    @Input() pokemonList: Array<Pokemon>;
    @Output() choosePokemon = new EventEmitter<Pokemon>();
    selectPokemonList: any;

    handleChange(selectedItem) {
        const pokemon: Pokemon = selectedItem;

        this.choosePokemon.emit(pokemon);
    }
}
