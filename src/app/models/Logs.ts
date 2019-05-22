import {Pokemon} from "./Pokemon";
import {Attack} from "./Attack";

export class Logs {
    private _pokemon: Pokemon;
    private _isWinnerMessage: boolean;
    private _attackLabel: string;
    private _attackFamilyClass: string;

    constructor(pokemon: Pokemon, attackLabel: string, attackFamilyClass: string, isWinnerMessage: boolean) {
        this._pokemon = pokemon;
        this._attackLabel = attackLabel;
        this._attackFamilyClass = attackFamilyClass;
        this._isWinnerMessage = isWinnerMessage;
    }

    get attackLabel(): string {
        return this._attackLabel
    }

    get attackFamilyClass(): string {
        return this._attackFamilyClass
    }

    get pokemon(): Pokemon {
        return this._pokemon
    }

    get isWinnerMessage(): boolean {
        return this._isWinnerMessage
    }
}
