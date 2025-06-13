import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../docs/sidebar/sidebar.component';
import { NgClass } from '@angular/common'; // 👈 Import NgClass here

@Component({
  selector: 'app-docs-layout',
  templateUrl: './docs-layout.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NgClass // 👈 Add it to imports
  ],
  styleUrls: ['./docs-layout.component.scss']
})
export class DocsLayoutComponent {
  isCollapsed = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
