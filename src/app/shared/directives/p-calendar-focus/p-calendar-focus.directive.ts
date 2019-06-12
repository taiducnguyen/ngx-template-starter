import { Directive, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[calendarFocus],[pcFocus]'
})
export class CalendarFocusDirective implements OnInit {
  private dpkInputElm: any;
  private isFistFocus = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.dpkInputElm = $(this.el.nativeElement).find('input');
      $(this.dpkInputElm).focus(() => {
        if (!this.isFistFocus) {
          this.isFistFocus = true;
          this.onReCalculateCalendarPosition();
        }
      });
    }, 500);
  }

  @HostListener('onClose') onClose() {
    setTimeout(() => {
      $('.app-overlay').remove();
      this.isFistFocus = false;
    }, 500);
  }

  @HostListener('onSelect') onSelect() {
    setTimeout(() => {
      $('.app-overlay').remove();
      this.isFistFocus = false;
    }, 500);
  }

  @HostListener('onBlur') onBlur() {
    setTimeout(() => {
      $('.app-overlay').remove();
      this.isFistFocus = false;
    }, 500);
  }

  onReCalculateCalendarPosition = () => {
    if (this.isFistFocus) {
      let datePicker = $(this.el.nativeElement).find('.ui-datepicker');
      let dpkTopPosition = datePicker && $(datePicker).offset().top;
      let dpkTLeftPosition = datePicker && $(datePicker).offset().left;
      let dpkWidth = datePicker && $(datePicker).width();
      $(datePicker).css('width', ((dpkWidth && dpkWidth + 40) || 0) + 'px');
      $(datePicker).css('top', (dpkTopPosition && (dpkTopPosition - 15) | 0) + 'px');
      $(datePicker).css('left', dpkTLeftPosition + 'px');
      $(datePicker).css('min-width', 'unset');
      if (!$('body').find('.app-overlay').length) {
        $('body').append("<div class='app-overlay'></div>");
      }
      $(datePicker).css('position', 'fixed');
    }
  };
}
