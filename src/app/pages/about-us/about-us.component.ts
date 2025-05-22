import { Component } from '@angular/core';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { MonetizeAppComponent } from "../../components/monetize-app/monetize-app.component";
@Component({
  selector: 'app-about-us',
  imports: [NgxMarqueeComponent, MonetizeAppComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
