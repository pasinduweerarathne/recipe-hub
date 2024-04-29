import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { RecipeServiceService } from '../../services/recipe/recipe-service.service';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class CreateRecipeFormComponent {
  constructor(private recipeService: RecipeServiceService) {}

  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  onSubmit() {
    console.log('values', this.recipeItem);
    this.recipeService.createRecipe(this.recipeItem).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error(error),
    });
  }
}
