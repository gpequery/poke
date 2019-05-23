import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attack, Pokemon} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class PokeApiService {
    baseUrl = 'https://pokeapi.co/api/v2/';
    pokemonList: Pokemon[] = [];

    constructor(private httpClient: HttpClient) {}

    initPokemon(): Pokemon[] {
        this.addPokemonById(1);
        this.addPokemonById(2);
        this.addPokemonById(3);
        this.addPokemonById(4);

        return this.pokemonList;
    }

    addPokemonById(id: number) {
        this.httpClient.get(this.baseUrl + 'pokemon/' + id + '/').subscribe(data => {
            let name = data['name'];
            let speed = data['stats'][0]['base_stat'];
            let family = data['types'][0]['type']['name'];

            let currentPokemon = new Pokemon(name, speed, family);

            // for (let index in data['moves']) {
            //     this.getAttackByUrl(currentPokemon, data['moves'][index]['move']['url']);
            //
            //     if (parseInt(index) === 3) {
            //         break;
            //     }
            // }

            this.pokemonList.push(currentPokemon);
        });
    }

    getAttackByUrl(pokemon: Pokemon, url: string): void {

        this.httpClient.get(url).subscribe(data => {
            pokemon.addAttack(new Attack(data['name'], data['power'], data['priority'], data['type']['name']));
        });
    }
}
