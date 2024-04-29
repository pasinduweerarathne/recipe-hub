import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthServiceService } from './services/auth/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    AuthComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  user: any = null;

  constructor(public authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (auth) => console.log('user ', auth),
      error: (error) => console.log('error ', error),
    });
    this.authService.authSubject.subscribe((auth) => (this.user = auth.user));
  }
}
