import { AfterViewInit, Component } from '@angular/core';
import { NgxMeteorsComponent } from '@omnedia/ngx-meteors';
@Component({
  selector: 'app-monetize-app',
  standalone: true,
  imports: [NgxMeteorsComponent],
  templateUrl: './monetize-app.component.html',
  styleUrl: './monetize-app.component.scss'
})
export class MonetizeAppComponent implements AfterViewInit {
  ngAfterViewInit() {
    const options = document.querySelectorAll('.custom-select option');
    options.forEach(option => {
      if (option.textContent && option.textContent.length > 24) {
        option.textContent = option.textContent.substring(0, 24) + '...';
      }
    });
  }
}
