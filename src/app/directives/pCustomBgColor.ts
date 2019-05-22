import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[pCustomBgColor]'
})
export class PCustomBgColor implements OnChanges{

  @Input() className: string;
  oldClassName: string;

  constructor(public element: ElementRef, public renderer: Renderer2) {
  }

  ngOnChanges(){
      this.renderer.removeClass(this.element.nativeElement, "bg-" + this.oldClassName);
      this.renderer.addClass(this.element.nativeElement, "bg-" + this.className);

      this.oldClassName = this.className;
  }
}

