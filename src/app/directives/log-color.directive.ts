import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
    selector: '[appLogColor]'
})

export class LogColorDirective {

    constructor() {
        // renderer.setElementStyle(element.nativeElement, 'backgroundColor', 'yellow');
    }

}
