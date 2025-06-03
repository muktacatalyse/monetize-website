import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  NgZone,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import VanillaTilt from 'vanilla-tilt';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { ServicesComponent } from "../../components/services/services.component";
import { SupportedPlatformComponent } from "./supported-platform/supported-platform.component";
import { FaqComponent } from "./faq/faq.component";

gsap.registerPlugin(ScrollTrigger, Physics2DPlugin);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgxTypedJsModule,
    NgxCrypticTextComponent,
    ServicesComponent,
    SupportedPlatformComponent,
    FaqComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private resizeObserver?: ResizeObserver;
  private removeListeners: Array<() => void> = [];

  @ViewChild('lottieContainerHero', { static: false }) lottieContainerHeroRef!: ElementRef;
  @ViewChild('lottieContainerSP', { static: false }) lottieContainerSPRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private el: ElementRef) { }

  ngOnInit() {
    AOS.init();
  }

  ngAfterViewInit(): void {
    // ----------------------------------------
    // 1. Apply VanillaTilt Effects
    // ----------------------------------------
    VanillaTilt.init(this.el.nativeElement.querySelectorAll('.user-insights .us-img'), {
      max: 15,
      speed: 100,
      glare: true,
      'max-glare': 0.6,
      reset: false,
      scale: 1.03,
    });

    VanillaTilt.init(this.el.nativeElement.querySelectorAll('.your-earning-wrapper'), {
      max: 7,
      speed: 100,
      glare: false,
      reset: true,
    });

    // Exit if not in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    // ----------------------------------------
    // 2. Run animations outside Angular zone
    // ----------------------------------------
    this.ngZone.runOutsideAngular(async () => {
      const { default: lottie } = await import('lottie-web');

      setTimeout(() => {

        // ----------------------------------------
        // 3. Animate OS Ribbon on Scroll
        // ----------------------------------------
        const osRibbon = this.el.nativeElement.querySelector('.os-strip-img');
        if (osRibbon) {
          gsap.set(osRibbon, { x: 120, scale: 1.3 });

          gsap.to(osRibbon, {
            x: 0,
            rotate: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: osRibbon,
              start: 'top 80%',
              scrub: true,
              toggleActions: 'restart none none none',
              markers: false,
            },
          });
        }


        // ----------------------------------------
        // 4. Lottie Animation: Hero Ribbon Scroll Sync
        // ----------------------------------------
        const lottieEl = this.lottieContainerHeroRef?.nativeElement;
        if (lottieEl) {
          const lottieAnim = lottie.loadAnimation({
            container: lottieEl,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/json/hero-marquee.json',
          });

          lottieAnim.addEventListener('DOMLoaded', () => {
            const totalFrames = lottieAnim.totalFrames;
            const playhead = { frame: 0 };

            gsap.to(playhead, {
              frame: totalFrames - 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: '.hero-ribbon',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
              onUpdate: () => {
                lottieAnim.goToAndStop(playhead.frame, true);
              },
            });
          });
        }

        // ----------------------------------------
        // 5. Refresh ScrollTrigger after setup
        // ----------------------------------------
        ScrollTrigger.refresh();
      }, 300);
    });
  }

  // ----------------------------------------
  // Cleanup listeners and GSAP triggers
  // ----------------------------------------
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    this.removeListeners?.forEach(fn => {
      if (typeof fn === 'function') fn();
    });
  }
}
