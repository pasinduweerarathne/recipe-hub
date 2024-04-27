package com.pasindu.service;

import com.pasindu.model.Recipe;
import com.pasindu.model.User;
import com.pasindu.repository.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final static Logger logger = LoggerFactory.getLogger(RecipeServiceImpl.class);

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe createRecipe(Recipe recipe, User user) {
        Recipe newRecipe = new Recipe();

        newRecipe.setTitle(recipe.getTitle());
        newRecipe.setDescription(recipe.getDescription());
        newRecipe.setImage(recipe.getImage());
        newRecipe.setUser(user);
        newRecipe.setCreatedAt(LocalDateTime.now());

        return recipeRepository.save(newRecipe);
    }

    @Override
    public Recipe findRecipeById(Long id) throws Exception {
        Optional<Recipe> existingRecipe = recipeRepository.findById(id);

        if (existingRecipe.isPresent()) {
            return existingRecipe.get();
        }

        throw new Exception("Recipe not found with id " + id);
    }

    @Override
    public void deleteRecipe(Long id) throws Exception {
        findRecipeById(id);

        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe updateRecipe(Recipe recipe, Long id) throws Exception {
        Recipe existingRecipe = findRecipeById(id);

        if (recipe.getTitle() != null) existingRecipe.setTitle(recipe.getTitle());
        if (recipe.getDescription() != null) existingRecipe.setDescription(recipe.getDescription());
        if (recipe.getImage() != null) existingRecipe.setImage(recipe.getImage());

        return recipeRepository.save(existingRecipe);
    }

    @Override
    public List<Recipe> findAllRecipe() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe likeRecipe(Long recipeId, User user) throws Exception {
        Recipe existingRecipe = findRecipeById(recipeId);

        if (existingRecipe.getLikes().contains(user.getId())) {
            existingRecipe.getLikes().remove(user.getId());
            logger.info("{} liked this recipe", user.getFullName());
        } else {
            existingRecipe.getLikes().add(user.getId());
            logger.info("{} unliked this recipe", user.getFullName());
        }

        return recipeRepository.save(existingRecipe);
    }
}
