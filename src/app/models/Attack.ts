export class Attack {
    private _label: string;
    private _priority: number;
    private _power: number;

    constructor(label: string, priority: number, power: number) {
        this._label = label;
        this._priority = priority;
        this._power = power;
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
}
