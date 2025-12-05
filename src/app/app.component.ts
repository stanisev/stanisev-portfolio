import { Component, HostListener, Renderer2, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  sections: NodeListOf<HTMLElement>;
  private scrollTimeout: any;
  private isScrolling: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.sections = this.el.nativeElement.querySelectorAll('section[id]');
  }

  ngOnInit(): void {
    // Handle all anchor link clicks for smooth scrolling
    const allLinks = this.el.nativeElement.querySelectorAll('a[href^="#"]');
    allLinks.forEach((link: HTMLElement) => {
      link.addEventListener('click', (e: Event) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          this.smoothScrollToSection(href.substring(1));
        }
      });
    });
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

    // Clear any animation classes after scroll completes
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      // Clean up any lingering animation classes
      this.sections.forEach((section) => {
        this.renderer.removeClass(section, 'section-leave');
      });
    }, 300);
  }

  private smoothScrollToSection(sectionId: string): void {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    this.isScrolling = true;
    const currentSection = this.getCurrentSection();
    
    // Remove any existing animation classes
    this.sections.forEach((section) => {
      this.renderer.removeClass(section, 'section-enter');
      this.renderer.removeClass(section, 'section-leave');
    });
    
    // Fade out current section if different
    if (currentSection && currentSection.id !== sectionId) {
      this.renderer.addClass(currentSection, 'section-leave');
    }

    // Calculate offset position (accounting for fixed nav)
    const offsetTop = targetSection.offsetTop - 58;
    
    // Remove leave animation from target before scrolling
    this.renderer.removeClass(targetSection, 'section-leave');
    
    // Smooth scroll
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    // Fade in target section after scroll starts
    setTimeout(() => {
      this.renderer.addClass(targetSection, 'section-enter');
      
      // Clean up animation classes after animation completes
      setTimeout(() => {
        this.renderer.removeClass(targetSection, 'section-enter');
        if (currentSection) {
          this.renderer.removeClass(currentSection, 'section-leave');
        }
      }, 600);
    }, 100);
  }

  private getCurrentSection(): HTMLElement | null {
    const scrollPosition = window.scrollY + 100;
    let currentSection: HTMLElement | null = null;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        currentSection = section;
      }
    });

    return currentSection;
  }

  ngOnDestroy(): void {
    clearTimeout(this.scrollTimeout);
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
