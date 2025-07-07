import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private el: ElementRef) { }

  @Output() public ClickOutSide =new EventEmitter();

  @HostListener('document:click',['$event.target'])
  public onClick(event: any) {
    
    const clickInside = this.el.nativeElement.contains(event);
    if(!clickInside){
      this.ClickOutSide.emit(event);
    }
  }
}
