import {Pokemon} from "./Pokemon";

export class Player {
    private _name: string;
    private _pokemons: Array<Pokemon>;

    constructor(name: string) {
        this._name = name;
        this._pokemons = [];
    }

    get name(): string {
        return this._name;
    }

    get pokemons(): Array<Pokemon> {
        return this._pokemons;
    }

    addPokemon(newPokemon: Pokemon) {
        this._pokemons.push(newPokemon);
    }

    haveAlivePokemon(): boolean {
        let result = false;
        this.pokemons.forEach(pokemon => {
            if (!pokemon.isDead()) {
                result = true;
            }
        });

        console.log(result);

        return result;
    }
}
