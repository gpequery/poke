import {Attack} from './Attack';
import {Family} from '../enum/Family';

export class Pokemon {
    private _name: string;
    private _speed: number;
    private _life: number;
    private _family: Family;
    private _attacks: Array<Attack>;

    constructor(name: string, speed: number, family: Family, attacks: Array<Attack>) {
        this._name = name;
        this._speed = speed;
        this._life = 100;
        this._family = family;
        this._attacks = attacks;
    }

    get name(): string {
        return this._name;
    }

    set name(speed: string) {
        this._name = name;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(speed: number) {
        this._speed = speed;
    }

    get life(): number {
        return this._life;
    }

    set life(life: number) {
        this._life = life;
    }

    get attacks(): Array<Attack> {
        return this._attacks;
    }

    set attacks(attacks: Array<Attack>) {
        this._attacks = attacks;
    }

    get family(): Family {
        return this._family;
    }

    set family(family: Family) {
        this._family = family;
    }

    static attack(otherPokemon: Pokemon, myAttack: Attack): boolean {
        otherPokemon.life -= myAttack.power;

        if (otherPokemon.life < 0) {
            otherPokemon.life = 0;
        }

        return otherPokemon.life <= 0;
    }

    getRandomAttack(): Attack {
        return this.attacks[randomInt(0, this.attacks.length - 1)];
    }

    isFirstToAttack(myAttack: Attack, otherAttack: Attack, otherPokemon: Pokemon): boolean {
        if (myAttack.priority === otherAttack.priority) {
            if (this.speed === otherPokemon.speed) {
                return Math.random() > 0.5;
            } else {
                return this.speed > otherPokemon.speed;
            }
        }

        return myAttack.priority > otherAttack.priority;
    }

    isDead() {
        return this.life <= 0;
    }
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
