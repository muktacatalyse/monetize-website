import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-common-template',
  standalone: true,
  templateUrl: './common-template.component.html',
  styleUrls: ['./common-template.component.scss']
})
export class CommonTemplateComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const container = document.querySelector('.steps-container') as HTMLElement;
    const section = document.querySelector('.steps') as HTMLElement;

    if (container && section) {
      const scrollAmount = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false // Remove in production
        }
      });
    }
  }
}
