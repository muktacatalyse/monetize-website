import { Component, AfterViewInit } from '@angular/core';

declare var bootstrap: any; // Allows TypeScript to recognize Bootstrap modal

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const modalEl = document.getElementById('surveyWallDemo');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
