import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(public dialog: MatDialog) {}

  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  onSubmit() {
    console.log('values', this.recipeItem);
  }
}
