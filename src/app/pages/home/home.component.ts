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

gsap.registerPlugin(ScrollTrigger, Physics2DPlugin);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgxTypedJsModule,
    NgxCrypticTextComponent,
    ServicesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private resizeObserver?: ResizeObserver;
  private removeListeners: Array<() => void> = [];

  @ViewChild('faqTags', { static: false }) faqTagsRef!: ElementRef;
  @ViewChild('lottieContainerHero', { static: false }) lottieContainerHeroRef!: ElementRef;
  @ViewChild('lottieContainerSP', { static: false }) lottieContainerSPRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2 // ✅ Inject Renderer2 properly
  ) { }

  ngOnInit() {
    AOS.init();
  }

  ngAfterViewInit(): void {
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

    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(async () => {
      const { default: lottie } = await import('lottie-web');

      setTimeout(() => {
        const osRibbon = this.el.nativeElement.querySelector('.os-strip-img');
        if (osRibbon) {
          gsap.set(osRibbon, {
            x: 120,
            scale: 1.3
          });

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
              markers: false
            }
          });
        }

        const cards2 = gsap.utils.toArray<HTMLElement>(
          this.faqTagsRef.nativeElement.querySelectorAll('[data-speed]')
        );

        cards2.forEach((card, index) => {
          gsap.to(card, {
            x: (index % 2 === 0 ? 1 : -1) * (Math.random() * 500 + 200),
            y: (1 - Math.random()) * 500,
            rotation: Math.random() * 360,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: this.faqTagsRef.nativeElement,
              start: 'top center',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true
            }
          });
        });

        const spContainer = this.el.nativeElement.querySelector('.sp-container') as HTMLElement;
        const spChildren = spContainer?.querySelectorAll<HTMLElement>('.splatform-card');
        if (spContainer && spChildren?.length) {
          const onMove = (e: MouseEvent) => {
            const rect = spContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;

            spChildren.forEach(child => {
              gsap.to(child, {
                rotateX,
                rotateY,
                scale: 1.05,
                transformPerspective: 1000,
                transformOrigin: 'center',
                duration: 0.6,
                ease: 'power2.out'
              });
            });
          };

          const resetChildren = () => {
            spChildren.forEach(child => {
              gsap.to(child, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
              });
            });
          };

          // ✅ Safely add listeners
          this.removeListeners.push(
            this.renderer.listen(spContainer, 'mousemove', onMove),
            this.renderer.listen(spContainer, 'mouseleave', resetChildren)
          );
        }

        const lottieEl = this.lottieContainerHeroRef?.nativeElement;
        if (lottieEl) {
          const lottieAnim = lottie.loadAnimation({
            container: lottieEl,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/json/marquee2.json'
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
              }
            });
          });
        }

        const lottieEl2 = this.lottieContainerSPRef?.nativeElement;
        if (lottieEl2) {
          const lottieAnim = lottie.loadAnimation({
            container: lottieEl2,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'assets/json/marquee3.json'
          });

          lottieAnim.addEventListener('DOMLoaded', () => {
            const totalFrames = lottieAnim.totalFrames;
            const playhead = { frame: 0 };

            gsap.to(playhead, {
              frame: totalFrames - 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: '.supported-platform-ribbon',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
              onUpdate: () => {
                lottieAnim.goToAndStop(playhead.frame, true);
              }
            });
          });
        }

        ScrollTrigger.refresh();
      }, 300);
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    this.removeListeners?.forEach(fn => {
      if (typeof fn === 'function') {
        fn();
      }
    });
  }
}
