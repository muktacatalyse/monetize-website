import { Component } from '@angular/core';
import { MonetizeAppComponent } from "../../components/monetize-app/monetize-app.component";
@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [MonetizeAppComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {

}
