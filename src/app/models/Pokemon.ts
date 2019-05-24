import {Attack, Family} from '.';

export class Pokemon {
    private _name: string;
    private _speed: number;
    private _life: number;
    private _family: Family;
    private _currentAttack: Attack;
    private _attacks: Array<Attack>;
    private _image: string;

    constructor(name: string, speed: number, family: Family, image: string, attacks: Array<Attack>) {
        this._name = name;
        this._speed = speed;
        this._life = 100;
        this._family = family;
        this._image = image;
        this._attacks = attacks;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
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

    get image(): string {
        return this._image;
    }

    set image(image: string) {
        this._image = image;
    }

    get attacks(): Array<Attack> {
        return this._attacks;
    }

    set attacks(attacks: Array<Attack>) {
        this._attacks = attacks;
    }

    get currentAttack(): Attack {
        return this._currentAttack;
    }

    set currentAttack(currentAttack: Attack) {
        this._currentAttack = currentAttack;
    }

    get family(): Family {
        return this._family;
    }

    set family(family: Family) {
        this._family = family;
    }

    addAttack(attack: Attack) {
        this._attacks.push(attack);
    }

    prepareAttack() {
        this.currentAttack = this.attacks[randomInt(0, this.attacks.length - 1)];
    }

    attack(otherPokemon: Pokemon): number[] {
        let damage = this.currentAttack.power;

        let bonus = 1;
        if (this.currentAttack.isStrong(otherPokemon)) {
            bonus ++
        }

        if (bonus) {
            damage *= bonus;
        }

        otherPokemon.life -= damage;

        if (otherPokemon.life < 0) {
            otherPokemon.life = 0;
        }

        return [damage, bonus];
    }

    isFirstToAttack(otherPokemon: Pokemon): boolean {
        if (this.currentAttack.priority === otherPokemon.currentAttack.priority) {
            if (this.speed === otherPokemon.speed) {
                return Math.random() > 0.5;
            } else {
                return this.speed > otherPokemon.speed;
            }
        }

        return this.currentAttack.priority > otherPokemon.currentAttack.priority;
    }

    isDead() {
        return this.life <= 0;
    }
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
