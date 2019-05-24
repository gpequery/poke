import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Attack, Family, Pokemon} from "../../models";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PokedexService {

    constructor(private httpClient: HttpClient) {
    }

    getPokemonById(id: number): Observable<Pokemon> {
        let apiUrl = 'https://pokeapi.co/api/v2';
        let pokemonUrl = `${apiUrl}/pokemon/${id}`;

        let pokemon: Pokemon;

        return this.httpClient.get(pokemonUrl).pipe(
            map(pokemonData => {
                let name = pokemonData['name'];
                let speed = pokemonData['stats'][0]['base_stat'];
                let familyName = pokemonData['types'][0]['type']['name'];
                let imageUrl = pokemonData['sprites']['front_default'];

                pokemon = new Pokemon(name, speed, new Family(familyName), imageUrl, []);
                return pokemonData['moves'].slice(0, 2);
            }),
            map((moves) => {
                return moves.map(move => move['move']['url'])
            }),
            mergeMap((movesUrl) => {
                return forkJoin(movesUrl.map(url => {
                    return this.httpClient.get(url);
                }));
            }),
            map((attacks) => {
                attacks.map(attack => {
                    let family = new Family(attack['type']['name']);
                    pokemon.addAttack(new Attack(attack['name'], attack['priority'], attack['power'], family));
                });

                return pokemon
            })
        );
    }
}
