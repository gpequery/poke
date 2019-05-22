export class Family {
    private _label: string;
    private _className: string;
    private _weakFamily: Array<Family>;

    constructor(label: string, className: string) {
        this._label = label;
        this._className = className;
        this._weakFamily = [];
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

    addWeakFamily(family: Family) {
        this._weakFamily.push(family);
    }
}
