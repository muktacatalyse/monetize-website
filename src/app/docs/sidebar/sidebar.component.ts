import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private location: Location) {}

  isActive(targetUrl: string): boolean {
    // Compare the current path + hash with targetUrl
    return this.location.path(true) === targetUrl;
  }
  scrollToSection(event: MouseEvent, id: string): void {
    event.preventDefault();

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // ✅ Preserve the current path and update just the fragment
      const currentPath = this.location.path(false).split('#')[0]; // Remove any existing hash
      this.location.replaceState(`${currentPath}#${id}`);
    }
  }
}
