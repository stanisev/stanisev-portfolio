import { Component, HostListener, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    ScrollReveal().reveal('.prefill', {
      origin: 'top',
      distance: '60px',
      duration: 1000,
      delay: 200
    });
    ScrollReveal().reveal('.info', {
      distance: '60px',
      origin: 'right',
      delay: 800
    });
    ScrollReveal().reveal('.skills', {
      origin: 'left',
      distance: '60px',
      delay: 1000
    });
    ScrollReveal().reveal('.projects', {
      origin: 'top',
      distance: '70px',
      delay: 600
    });
    ScrollReveal().reveal('.experience', {
      origin: 'top',
      distance: '70px',
      delay: 300
    });
  }
}
