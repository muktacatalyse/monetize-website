import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
gsap.registerPlugin(PixiPlugin, ScrollTrigger);

@Component({
  selector: 'app-services',
  imports: [NgxMarqueeComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})

export class ServicesComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const servicesCard = gsap.utils.toArray('.services-card') as HTMLElement[];
    const middles = gsap.utils.toArray('.middle') as HTMLElement[];
    const mapScale = gsap.utils.mapRange(0, middles.length - 1, 0.75, 1);

    gsap.set(servicesCard, {
      transformStyle: 'preserve-3d',
      transformPerspective: 800
    });

    gsap.set(middles, {
      transformOrigin: 'center top',
      y: window.innerHeight,
      rotationX: 40,
      scale: 1.1
    });

    gsap.set('.team-background', { scale: 1.15 });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.services-wrapper',
        pin: '.services-section',
        start: 'top top',
        end: 'bottom',
        scrub: 1,
        onEnter: () => console.log('Enter scroll area')
      }
    })
      .from('.team-background', { scale: 0.075, ease: 'power1.in' })
      .to('.team-background', { scale: 1, ease: 'power1.in' })
      .set('.first', { transformOrigin: 'center top' })
      .to('.first', {
        rotationX: -40,
        y: -6,
        ease: 'power1.in',
        scale: 0.7
      })
      .to(middles, {
        scale: 1,
        ease: 'power1.out',
        y: (e: number) => 2 * e,
        rotationX: 0,
        stagger: 0.5
      }, '-=0.4')
      .to(middles, {
        rotationX: -40,
        y: (e: number) => 12 * e,
        ease: 'power1.in',
        scale: (e: number) => mapScale(e),
        stagger: 0.5
      }, '<+=0.5');

    gsap.to(".sc-half-circle", {
      scrollTrigger: {
        trigger: ".supported-platforms",
        start: "top 200%",
        end: "bottom bottom",
        scrub: .4
      },
      scale: 3.5
    })
  }
}
