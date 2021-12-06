using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Whats_For_Dinner.Models
{
    public class Recipe
    {
        public Recipe()
        {

        }

        public Recipe(string name, string ingredients, string instructions, string description)
        {
            this.Name = name;
            this.Ingredients = ingredients;
            this.Instructions = instructions;
            this.Description = description; 
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
        public string Description { get; set; }
        public virtual List<RecipeTag> Tags { get; set; }

        //public virtual User CreatedBy {get; set;}

    }
}
