import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RecipeServiceService } from '../../services/recipe/recipe-service.service';

@Component({
  selector: 'app-edit-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './edit-recipe-form.component.html',
  styleUrl: './edit-recipe-form.component.scss',
})
export class EditRecipeFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: any,
    private recipeService: RecipeServiceService
  ) {}

  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  onSubmit() {
    console.log('values', this.recipeItem);
    this.recipeService.updateRecipe(this.recipeItem).subscribe();
  }

  ngOnInit() {
    this.recipeItem = this.recipe;
  }
}
