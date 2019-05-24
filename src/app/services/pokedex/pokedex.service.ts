import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attack, Pokemon} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

    private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';


    constructor(private httpClient: HttpClient) { }

    getAttack(url: string): Promise<Attack> {
        return this.httpClient.get(url).toPromise().then(
            response => {
                return new Attack(response['name'], response['power'], response['priority'], response['type']['name']);
            }
        )
    }

    getPokemon(id: number): any {
        let fullUrl: string = this.baseUrl+id;

        return this.httpClient.get(fullUrl)
            .toPromise()
            .then(async responsePokemon => {
                let name = responsePokemon['name'];
                let speed = responsePokemon['stats'][0]['base_stat'];
                let family = responsePokemon['types'][0]['type']['name'];

                let attack1: Attack = <Attack> await this.getAttack(responsePokemon['moves'][0]['move']['url']);
                let attack2: Attack = <Attack> await this.getAttack(responsePokemon['moves'][1]['move']['url']);
                let attack3: Attack = <Attack> await this.getAttack(responsePokemon['moves'][2]['move']['url']);
                let attack4: Attack = <Attack> await this.getAttack(responsePokemon['moves'][3]['move']['url']);

                return new Pokemon(name,speed,family, [attack1, attack2, attack3, attack4])});
    }
}
