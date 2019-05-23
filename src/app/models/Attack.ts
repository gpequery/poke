import {Family} from './Family';
import {Pokemon} from "./Pokemon";

export class Attack {
    private _label: string;
    private _priority: number;
    private _power: number;
    private _family: Family;

    constructor(label: string, priority: number, power: number, family: Family) {
        this._label = label;
        this._priority = priority;
        this._power = power;
        this._family = family;
    }

    get label(): string {
        return this._label
    }

    set label(label: string) {
        this._label = label
    }

    get power(): number {
        return this._power
    }

    set power(power: number) {
        this._power = power
    }

    get priority(): number {
        return this._priority
    }

    set priority(priority: number) {
        this._priority = priority
    }

    get family(): Family {
        return this._family
    }

    set family(family: Family) {
        this._family = family
    }

    isStrong(otherPokemon: Pokemon): boolean {
        return this.family.weakFamilies.includes(otherPokemon.family);
    }
}
