import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements AfterViewInit {
  @ViewChild('faqTags', { static: false }) faqTagsRef!: ElementRef;

  ngAfterViewInit(): void {
    if (!this.faqTagsRef?.nativeElement) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      this.faqTagsRef.nativeElement.querySelectorAll('[data-speed]')
    );

    cards.forEach((card, index) => {
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
          invalidateOnRefresh: true,
        },
      });
    });
  }
}
