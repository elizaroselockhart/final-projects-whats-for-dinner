using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Whats_For_Dinner.Models
{
    public class RecipeTag
    {
        public RecipeTag()
        {

        }

        public RecipeTag(int recipeid, int tagid)
        {
            this.RecipeId = recipeid;
            this.TagId = tagid;
        }

        public int Id { get; set; }
        public int RecipeId { get; set; }
        public int TagId { get; set; }
        public virtual Recipe Recipe { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
