import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
    selector: '[pCustomColor]'
})
export class PCustomColor implements OnChanges {

    @Input() className: string;
    @Input() prefix: string;
    oldClassName: string;

    constructor(public element: ElementRef, public renderer: Renderer2) {}

    ngOnChanges() {
        this.renderer.removeClass(this.element.nativeElement, `${this.prefix}-${this.oldClassName}`);
        this.renderer.addClass(this.element.nativeElement, `${this.prefix}-${this.className}`);

        this.oldClassName = this.className;
    }
}

