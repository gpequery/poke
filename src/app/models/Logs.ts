import {Pokemon} from "./Pokemon";

export class Logs {
    private _pokemon: Pokemon;
    private _isWinnerMessage: boolean;
    private _attackLabel: string;
    private _attackFamilyClass: string;
    private _attackData: number[];

    /* ATTACK LOG */
    constructor(pokemon: Pokemon, attackLabel: string, attackFamilyClass: string, attackData: number[], isWinnerMessage: boolean) {
        this._pokemon = pokemon;
        this._attackLabel = attackLabel;
        this._attackFamilyClass = attackFamilyClass;
        this._isWinnerMessage = isWinnerMessage;
        this._attackData = attackData;
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

    get attackData(): number[] {
        return this._attackData;
    }

    get isWinnerMessage(): boolean {
        return this._isWinnerMessage
    }

    getAttackDamage(): number {
        return this._attackData[0];
    }

    getAttackBonus(): number {
        return this._attackData[1];
    }
}
