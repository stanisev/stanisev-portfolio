import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  sections: NodeListOf<HTMLElement>;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.sections = this.el.nativeElement.querySelectorAll('section[id]');
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollUpElement = this.el.nativeElement.querySelector('#scroll-up');
    if (window.scrollY >= 350) {
      this.renderer.addClass(scrollUpElement, 'show-scroll');
    } else {
      this.renderer.removeClass(scrollUpElement, 'show-scroll');
    }

    const scrollDown = window.scrollY;

    this.sections = this.el.nativeElement.querySelectorAll('section[id]');
    this.sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute('id');
      const sectionLink = this.el.nativeElement.querySelector(`.nav__list a[href*="${sectionId}"]`);

      if (sectionLink) {
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
          this.renderer.addClass(sectionLink, 'active-link');
        } else {
          this.renderer.removeClass(sectionLink, 'active-link');
        }
      }
    });
  }
}
