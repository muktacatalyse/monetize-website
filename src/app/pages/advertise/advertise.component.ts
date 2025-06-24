import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-advertise',
  standalone: true,
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements AfterViewInit {
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
