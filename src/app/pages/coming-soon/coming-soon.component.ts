import { Component } from '@angular/core';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-coming-soon',
  imports: [NgxCrypticTextComponent, RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {

}
