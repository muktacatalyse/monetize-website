import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: [] // or .scss if you're using SCSS
})
export class AuthLayoutComponent {}
