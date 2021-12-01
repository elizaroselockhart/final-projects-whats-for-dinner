using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Whats_For_Dinner.Models;

namespace Whats_For_Dinner
{
    public class RecipeCollectionContext:DbContext
    {
        //Add DBsets here! :)
        public DbSet<Recipe> Recipes { get; set; }
       // public DbSet<RecipeTag> RecipeTag { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            var ConnectionString = "Server=(localdb)\\mssqllocaldb; Database=RecipeCollectionDB2; Trusted_Connection=True";

            builder.UseSqlServer(ConnectionString).UseLazyLoadingProxies();
            base.OnConfiguring(builder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Recipe>().HasData(
                //new Recipe() { Id =, Name = , Ingredients = , Instructions = , Description = },
                //Because we can't build lists into seed data, we'll have to edit our recipes manually and add the ingredients later


                new Recipe() { 
                    Id = 1, 
                    Name = "Grilled Peaches with Balsamic Vinegar", 
                    Ingredients = "4 peaches, halved (with pits removed);2 teaspoons olive oil;1/2 cup balsamic vinegar (preferably vanilla flavored!)",
                    Instructions = "1. Heat a grill to medium-high. 2. Brush a very light layer of olive oil on each side of the cut side of each peach half. 3. Put the peaches face down on the grill and brush the skin side with olive oil. 4. Grill peaches 4 to 5 minutes, undisturbed, until there are distinct grill marks on the peaches. 5. Flip the peaches and allow then to grill on the skin side until they are charred, warmed through and tender, but not mushy.  4 - 5 minutes.", 
                    Description = "What an easy way to transform a simple peach that can then be used in all types of dishes to bring interest and flavor." 
                },

                new Recipe() { 
                    Id = 2, 
                    Name = "Vanilla Balsamic Chicken", 
                    Ingredients = "1/2 cup vanilla balsamic vinegar;1/2 cup reduced sodium fat-free chicken broth;1/4 cup shallots, finely chopped;1/4 teaspoon orange zest;1/4 cup orange juice;1 clove garlic, minced;8 boneless skinless chicken thighs;1 tablespoon olive oil;1 teaspoon salt, divided;1/2 teaspoon black pepper",
                    Instructions = "1. Preheat oven to 450*. 2. Combine the vinegar, chicken broth, shallot, orange zest, and juice, and simmer until mixture is reduced to half a cup (about 20 minutes). Add half a teaspoon of salt and set aside. 3. While the sauce is reducing, combine half a teaspoon salt and pepper in a small bowl. Season chicken on all sides, and set aside in a single layer in a roasting pan that has been coated with the olive oil. 4. Bake in preheated oven for 10 minutes. 5. Brush half of the reduced broth mixture over chicken. Bake 5 minutes more, then brush on the remaining broth mixture. 6. Bake approximately 15 more minutes, or until internal temperature reaches at least 165*. 7. Serve over noodles, rice, or quinoa.", 
                    Description = "Our vanilla balsamic chicken uses rich vanilla balsamic vinegar and a touch of orange juice to create the traditional sweet and sour flavor combo that is so wonderful on chicken." 
                },

                new Recipe() { 
                    Id = 3, 
                    Name = "Hearty Stuffed Autumn Squash", 
                    Ingredients = "3 tablespoons Chipotle Olive Oil;3 tablespoons Black Currant Balsamic Vinegar, divided;1 medium or large acorn, delicata or small butternut squash;½ teaspoon kosher salt;¼ teaspoon freshly ground black pepper;6 oz spicy Italian sausage, bulk or with casings removed(turkey, or chicken sausage as work well);3 green onions, sliced;2 clove garlic, minced;2 cups tightly packed baby kale or torn kale leaves;3 tablespoons chicken stock;¼ cup pine nuts or pepitas;2 tablespoons grated fresh Parmesan;2 tablespoons panko breadcrumbs;½ tablespoon Pumpkin Seed Oil (optional)",
                    Instructions = "1. Preheat oven to 375°. 2. Optional step to make cutting the squash easier: using a fork, poke each squash 5 - 6 times so steam can escape.Put in microwave on high for 2 minutes.Remove carefully and let cool a couple of minutes. 3. Halve the squash down the middle, and remove the seeds.Cut a thin slice off the round bottom side of each squash half to create a stable base for when filling and broiling the squash.Score the inside of the squash with a sharp knife and brush each half with 1 / 2 tablespoon of oil and 1 / 2 tablespoon of vinegar.Allow to sit upright for 5 minutes for the oil and vinegar to penetrate the scoring.Sprinkle squash with salt and pepper. 4. Coat a foil - lined baking sheet with cooking spray, place squash flesh side down and bake until golden and tender, 30 - 40 minutes. Remove from oven; flip squash and set aside. 5. While the squash is cooking: Heat 1 tablespoon olive oil in a large nonstick skillet over medium heat. Cook the sausage through, breaking into pieces(about 6 minutes), and transfer to a paper towel-lined dish to drain. 6. Add final tablespoon of olive oil to the same pan and cook the onions until soft, about 3 minutes.Add the garlic and cook until fragrant, about 30 seconds.Add kale and combine. Add the chicken stock and 1 tablespoon balsamic vinegar.Cook until kale is tender, about 5 minutes, Stir in sausage and remove from heat. 7. When the filling is cooked and the squash is done roasting, divide the filling between the squash \"bowls.\" 8. Combine the nuts, Parmesan, panko breadcrumbs, and the nut oil of choice in a small bowl.Sprinkle evenly over squash. 9. Place in oven and roast 5 minutes. 10. Leave squash in the oven and turn oven to broil, and broil the squash an additional 2 - 3 minutes until the topping is golden brown, about 2 minutes. 11. Let cool 5 minutes and drizzle remaining Black Currant Balsamic Vinegar over the finished squash before serving. If serving 4, cut each half into half again at the table.", 
                    Description = "Spicy olive oil & Italian sausage pair with sweet balsamic vinegar & squash for a filling meal or a hearty side dish. The combination of nutty, sweet and spicy, makes this recipe irresistible."
                }
            );

            builder.Entity<Tag>().HasData(
                //new Tag() { Id = , Name = }
                new Tag() { Id = 1, Name = "dessert" },
                new Tag() { Id = 2, Name = "fruit" },
                new Tag() { Id = 3, Name = "grill" },
                new Tag() { Id = 4, Name = "vegan" },
                new Tag() { Id = 5, Name = "entree" },
                new Tag() { Id = 6, Name = "chicken" },
                new Tag() { Id = 7, Name = "sweet and sour" },
                new Tag() { Id = 8, Name = "beef" },
                new Tag() { Id = 9, Name = "vegetable" },
                new Tag() { Id = 10, Name =  "spicy" },
                new Tag() { Id = 11, Name = "Italian" }
                );

            //builder.Entity<RecipeTag>().HasData(
            //    //new RecipeTag() { Id = , RecipeId = , TagId = }
            //    new RecipeTag() { Id = 1, RecipesId = 1, TagsId = 1 },
            //    new RecipeTag() { Id = 2, RecipesId = 1, TagsId = 2 }, 
            //    new RecipeTag() { Id = 3, RecipesId = 1, TagsId = 3 },
            //    new RecipeTag() { Id = 4, RecipesId = 1, TagsId = 4 },
            //    new RecipeTag() { Id = 5, RecipesId = 2, TagsId = 5 },
            //    new RecipeTag() { Id = 6, RecipesId = 2, TagsId = 6 },
            //    new RecipeTag() { Id = 7, RecipesId = 2, TagsId = 7 },
            //    new RecipeTag() { Id = 8, RecipesId = 3, TagsId = 5 },
            //    new RecipeTag() { Id = 9, RecipesId = 3, TagsId = 8 },
            //    new RecipeTag() { Id = 10, RecipesId = 3, TagsId = 9 },
            //    new RecipeTag() { Id = 11, RecipesId = 3, TagsId = 10 },
            //    new RecipeTag() { Id = 12, RecipesId = 3, TagsId = 11 }
            //    );


            base.OnModelCreating(builder);
        }


    }
}
