using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Whats_For_Dinner.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<RecipeTag> Recipes { get; set; }
    }
}
