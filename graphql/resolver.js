const Recipe = require('../models/recipe');

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipe(_, { amount }) {
      const recipes = await Recipe.find().sort({ createdAt: 1 }).limit(amount);
      return recipes.map((recipe) => ({
        id: recipe._id, // Assuming _id is the unique identifier in your MongoDB model
        name: recipe.name,
        description: recipe.description,
        createdAt: recipe.createdAt,
        thumbsup: recipe.thumbsup,
        thumbsDown: recipe.thumbsDown,
      }));
    }
    ,
  },

  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsup: 0,
        thumbsDown: 0, // Fixed typo in field name "thumbersDown" to "thumbsDown"
      });
    
      try {
        const res = await createdRecipe.save();
        return {
          id: res._id, // Assuming _id is the unique identifier in your MongoDB model
          name: res.name, // Include other fields if needed
          description: res.description,
          createdAt: res.createdAt,
        };
      } catch (error) {
        throw new Error("Failed to create recipe");
      }
    },
    
    
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (await Recipe.updateOne(
        { _id: ID },
        { name: name, description: description }
      )).modifiedCount;
      return wasEdited;
    },
  },
};
