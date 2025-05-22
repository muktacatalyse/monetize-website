import { Component, AfterViewInit, NgZone } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  
  menuButtonText = 'Open Menu';
  isScrolled = false;
  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    const offcanvasEl = document.getElementById('offcanvasExample');
    if (offcanvasEl) {
      offcanvasEl.addEventListener('show.bs.offcanvas', () => {
        this.ngZone.run(() => this.menuButtonText = 'Close Menu');
      });

      offcanvasEl.addEventListener('hide.bs.offcanvas', () => {
        this.ngZone.run(() => this.menuButtonText = 'Open Menu');
      });
    }

    window.addEventListener('scroll', () => {
      this.ngZone.run(() => {
        this.isScrolled = window.scrollY > 50;
      });
    });
  }
  async ngOnInit() {
    AOS.init(); //for animation
  }
}
