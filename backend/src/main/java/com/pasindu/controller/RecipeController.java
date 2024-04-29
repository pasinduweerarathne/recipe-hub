package com.pasindu.controller;

import com.pasindu.model.Recipe;
import com.pasindu.model.User;
import com.pasindu.service.RecipeService;
import com.pasindu.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RecipeController {

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;

    @PostMapping("/create-recipe")
    public ResponseEntity<?> createRecipe(@RequestBody Recipe recipe, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Recipe createdRecipe = recipeService.createRecipe(recipe, user);

        logger.info("Recipe created with ID: {} successfully", createdRecipe.getId());
        return new ResponseEntity<>(createdRecipe, HttpStatus.CREATED);
    }

    @GetMapping("/recipes")
    public ResponseEntity<?> getRecipes() {
        try {
            return new ResponseEntity<>(recipeService.findAllRecipe(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-recipe/{recipeId}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long recipeId) {
        try {
            recipeService.deleteRecipe(recipeId);
            return new ResponseEntity<>("Recipe deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateRecipe(
            @RequestBody Recipe recipe,
            @PathVariable Long recipeId
    ) throws Exception {
        try {
            return new ResponseEntity<>(recipeService.updateRecipe(recipe, recipeId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/like-unlike-recipe")
    public ResponseEntity<?> likeRecipe(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(value = "recipeId") Long recipeId
    ) {
        try {
            User user = userService.findUserByJwt(jwt);
            return new ResponseEntity<>(recipeService.likeRecipe(recipeId, user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
