import { Component, Input, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-number-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-ticker.component.html',
  styleUrl: './number-ticker.component.scss'
})
export class NumberTickerComponent implements AfterViewInit {
  @Input() targetNumber = 0;
  @Input() prefix: string = '';
  displayedNumber = 0;
  @ViewChild('tickerEl', { static: true }) tickerEl!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Initialize GSAP ScrollTrigger to animate when the section is in view
    ScrollTrigger.create({
      trigger: this.tickerEl.nativeElement,
      start: 'top 80%',
      once: true,
      onEnter: () => this.animateNumber()
    });
  }

  animateNumber() {
    // Animate the number from 0 to the targetNumber with a smooth transition
    gsap.to(this, {
      displayedNumber: this.targetNumber,
      duration: 3, // Duration of the animation (adjust as needed)
      ease: 'power2.out', // Ease out effect for smooth animation
      onUpdate: () => {
        this.cdr.detectChanges(); // Manually trigger change detection to update the view
      }
    });
  }

  get formattedNumber(): string {
    // Format the number with 2 decimal places and no commas
    return this.displayedNumber.toFixed(2);
  }
}
