import { Directive, ElementRef, Input, OnInit, OnChanges, Renderer2, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[displayContent]'
})
export class DisplayContentDirective implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    let displayContent = this.el.nativeElement.getAttribute('data-display');
    const tmp = document.createElement('span');
    tmp.className = 'align-center';
    tmp.innerHTML = displayContent;
    this.renderer.appendChild(this.el.nativeElement.parentNode, tmp);
  }
}
