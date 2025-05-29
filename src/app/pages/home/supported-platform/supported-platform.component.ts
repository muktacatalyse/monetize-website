import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(ScrollTrigger, Physics2DPlugin);

@Component({
  selector: 'app-supported-platform',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supported-platform.component.html',
  styleUrl: './supported-platform.component.scss',
})
export class SupportedPlatformComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spContainer', { static: false }) spContainerRef!: ElementRef;
  @ViewChild('lottieContainerSP', { static: false }) lottieContainerSPRef!: ElementRef;

  private removeListeners: Array<() => void> = [];

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(async () => {
      const spContainer = this.spContainerRef?.nativeElement as HTMLElement;
      const spChildren = spContainer?.querySelectorAll<HTMLElement>('.splatform--card');

      if (spContainer && spChildren?.length) {
        const onMove = (e: MouseEvent) => {
          const rect = spContainer.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 1;
          const centerY = rect.height / 1;

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

        this.removeListeners.push(
          this.renderer.listen(spContainer, 'mousemove', onMove),
          this.renderer.listen(spContainer, 'mouseleave', resetChildren)
        );
      }

      // ✅ Lottie Ribbon Animation
      const { default: lottie } = await import('lottie-web');
      const lottieEl = this.lottieContainerSPRef?.nativeElement;

      if (lottieEl) {
        const lottieAnim = lottie.loadAnimation({
          container: lottieEl,
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
    });
  }

  ngOnDestroy(): void {
    this.removeListeners.forEach(fn => {
      if (typeof fn === 'function') fn();
    });
  }
}
