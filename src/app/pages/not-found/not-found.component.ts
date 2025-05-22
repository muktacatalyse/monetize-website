import { Component } from '@angular/core';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  imports: [NgxCrypticTextComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
