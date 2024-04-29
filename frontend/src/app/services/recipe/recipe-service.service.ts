import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/recipes`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post(`${this.baseUrl}/api/create-recipe`, recipe, { headers })
      .pipe(
        tap((newRecipe) => {
          const currentState = this.recipeSubject.value;
          this.recipeSubject.next({
            ...currentState,
            recipes: [newRecipe, ...currentState.recipes],
          });
        })
      );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/update-recipe/${recipe.id}`, recipe, {
        headers,
      })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) =>
            item.id === updatedRecipe.id ? updatedRecipe : item
          );
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/api/delete-recipe/${id}`, { headers })
      .pipe(
        tap((deleteRecipe: any) => {
          console.log('hey');
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.filter(
            (item: any) => item.id !== id
          );
          console.log(updatedRecipes);
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

  likeRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(
        `${this.baseUrl}/api/like-unlike-recipe?recipeId=${recipe.id}`,
        {},
        { headers }
      )
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) => {
            item.id === updatedRecipe.id ? updatedRecipe : item;
          });
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }
}
