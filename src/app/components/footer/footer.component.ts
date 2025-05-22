import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, Component, Inject, PLATFORM_ID, NgZone,
  OnDestroy, Renderer2, ElementRef, ViewChild
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ftaRef') ftaRef!: ElementRef;
  private removeListeners: Array<() => void> = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    // Ensure code only runs in the browser
    if (!isPlatformBrowser(this.platformId)) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {

        // === SECTION 1: Curve animation on scroll ===
        document.querySelectorAll<HTMLElement>('.c-bend_bottom').forEach(el => {
          const section = el.closest<HTMLElement>('.curve-footer');
          if (section) {
            gsap.to(el, {
              height: '0px',
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom 40%',
                scrub: 3,
              }
            });
          }
        });
        ScrollTrigger.refresh();

        
        // === SECTION 2: Button follow and background parallax ===
        const fta = this.ftaRef.nativeElement as HTMLElement;
        const bg = fta.querySelector<HTMLElement>('.c-gradient');
        const btn = fta.querySelector<HTMLElement>('.cta-button');
        if (!fta || !bg || !btn) return;

        // Center the button inside container
        const centerBtn = () => {
          const rect = fta.getBoundingClientRect();
          gsap.to(btn, {
            x: rect.width / 2 - btn.offsetWidth / 2,
            y: rect.height / 2 - btn.offsetHeight / 2,
            duration: 0.5,
            ease: 'power2.out'
          });
        };

        // Handle mouse movement for button and background
        const onMove = (e: MouseEvent) => {
          const r = fta.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;

          // Update button position toward cursor
          const bx = Math.max(0, Math.min(r.width - btn.offsetWidth, x - btn.offsetWidth / 2));
          const by = Math.max(0, Math.min(r.height - btn.offsetHeight, y - btn.offsetHeight / 2));
          gsap.to(btn,
            {
              x: bx,
              y: by,
              duration: 4,
              ease: 'power2.out'
            });

          // Parallax effect for background
          const [vw, vh, intensity] = [window.innerWidth, window.innerHeight, 80];
          const ox = ((x - r.width / 2) / vw) * intensity;
          const oy = ((y - r.height / 2) / vh) * intensity;
          gsap.to(bg, {
            x: (ox / 100) * vw,
            y: (oy / 100) * vh,
            scale: 3.5,
            duration: 5,
            ease: 'power2.out'
          });
        };

        // Register event listeners for interaction
        this.removeListeners.push(
          this.renderer.listen(fta, 'mousemove', onMove),
          this.renderer.listen(fta, 'mouseleave', centerBtn)
        );

        centerBtn(); // Initial button centering
      });
    });
  }

  // Cleanup scroll triggers and event listeners
  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.removeListeners.forEach(fn => fn());
  }
}
