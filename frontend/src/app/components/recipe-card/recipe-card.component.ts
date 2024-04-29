import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditRecipeFormComponent } from '../edit-recipe-form/edit-recipe-form.component';
import { CommonModule } from '@angular/common';
import { RecipeServiceService } from '../../services/recipe/recipe-service.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe: any;

  constructor(
    public dialog: MatDialog,
    private recipeService: RecipeServiceService
  ) {}

  handleOpenEditRecipeForm() {
    this.dialog.open(EditRecipeFormComponent, { data: this.recipe });
  }

  handleDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
  }

  handleLike() {
    this.recipeService.likeRecipe(this.recipe).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
  }

  ngOnInit(): void {
    // console.log(this.recipe);
  }
}
