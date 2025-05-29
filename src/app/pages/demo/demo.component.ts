import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin, ScrollTrigger);

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('responsiveElement') responsiveElementRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const el = this.responsiveElementRef.nativeElement as HTMLElement;

      const updateClass = () => {
        if (window.innerWidth < 576) {
          el.classList.remove('row');
        } else {
          if (!el.classList.contains('row')) {
            el.classList.add('row');
          }
        }
      };

      // Initial run
      updateClass();

      // Listen to resize events
      window.addEventListener('resize', updateClass);
    }
  }
}
