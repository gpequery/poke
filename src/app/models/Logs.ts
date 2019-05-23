import {Pokemon} from "./Pokemon";

export class Logs {
    private _pokemon: Pokemon;
    private _isWinnerMessage: boolean;
    private _attackLabel: string;
    private _attackFamilyClass: string;
    private _bonusDamage: boolean;

    constructor(pokemon: Pokemon, attackLabel: string, attackFamilyClass: string, bonusDamage: boolean, isWinnerMessage: boolean) {
        this._pokemon = pokemon;
        this._attackLabel = attackLabel;
        this._attackFamilyClass = attackFamilyClass;
        this._isWinnerMessage = isWinnerMessage;
        this._bonusDamage = bonusDamage;
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

    get bonusDamage(): boolean {
        return this._bonusDamage;
    }

    get isWinnerMessage(): boolean {
        return this._isWinnerMessage
    }
}
