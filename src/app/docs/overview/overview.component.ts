import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  constructor(private location: Location) {}

  scrollToSection(event: MouseEvent, id: string): void {
    event.preventDefault();

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'instant' });

      // ✅ Preserve the current path and update just the fragment
      const currentPath = this.location.path(false).split('#')[0]; // Remove any existing hash
      this.location.replaceState(`${currentPath}#${id}`);
    }
  }
}
