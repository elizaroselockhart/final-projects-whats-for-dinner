using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Whats_For_Dinner.Models
{
    public class SearchData
    {
        public List<Recipe> allRecipes;

        public List<Tag> allTags;

        public SearchData(List<Recipe> recipes, List<Tag> tags)
        {
            allRecipes = recipes;
            allTags = tags;
        }
    }
}
