export class Family {
    private _label: string;
    private _className: string;
    private _weakFamilies: Array<Family>;

    constructor(label: string, className: string) {
        this._label = label;
        this._className = className;
        this._weakFamilies = [];
    }

    get label(): string {
        return this._label
    }

    set label(label: string) {
        this._label = label
    }

    get className(): string {
        return this._className
    }

    set className(className: string) {
        this._className = className
    }

    get weakFamilies(): Array<Family> {
        return this._weakFamilies
    }

    addWeakFamilies(family: Family) {
        this._weakFamilies.push(family);
    }
}
