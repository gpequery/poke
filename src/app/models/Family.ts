export class Family {
    private _label: string;
    private _className: string;
    private _weakFamilies: Array<Family>;

    constructor(label: string) {
        this._label = label;
        this._className = this.getFamilyClass();
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

    getFamilyClass(): string {
        switch (this._label) {
            case 'poison':
                return 'poison';
            case 'fire':
                return 'danger';
            case 'water':
                return 'primary';
            case 'electric':
                return 'warning';
            case 'flying':
                return 'secondary';
            case 'grass':
                return 'success';
        }
    }
}
