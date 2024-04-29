import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../../components/create-recipe-form/create-recipe-form.component';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { RecipeServiceService } from '../../services/recipe/recipe-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecipeCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  recipes = [];

  constructor(
    public dialog: MatDialog,
    public authService: AuthServiceService,
    private recipeService: RecipeServiceService
  ) {}

  handleOpenCreateRecipeForm() {
    this.dialog.open(CreateRecipeFormComponent);
  }

  ngOnInit(): void {
    this.authService.getUserProfile();
    this.recipeService.getRecipes().subscribe();
    this.recipeService.recipeSubject.subscribe((state) => {
      this.recipes = state.recipes;
    });
  }
}
