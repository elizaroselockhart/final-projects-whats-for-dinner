using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Whats_For_Dinner.Models;

namespace Whats_For_Dinner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeTagController : ControllerBase
    {
        private readonly RecipeCollectionContext _db;
        public RecipeTagController(RecipeCollectionContext db)
        {
            _db = db;
        }

        [HttpPost]
        public ActionResult<RecipeTag> Post([FromBody] RecipeTag recipetag, int recipeId, int tagId)
        {
            _db.RecipeTags.Add(recipetag);
            //recipetag.Recipe = _db.Recipes.Find(recipeId);
            //recipetag.Tag = _db.Tags.Find(tagId);
            _db.SaveChanges();

            return recipetag;
        }


        [HttpGet]
        public ActionResult<IEnumerable<RecipeTag>> Get()
        {
            return _db.RecipeTags.ToList();
        }

        [HttpGet("{recipeid}")]
        public ActionResult<IEnumerable<RecipeTag>> Get(int recipeid)
        {
            List<RecipeTag> AssociatedRecipeTags = new List<RecipeTag>();

            //Purpose of this loop: iterate over all reipetags and return a list of recipetags with associated tagids.
            foreach(RecipeTag recipetag in _db.RecipeTags)
            {
                if (recipetag.RecipeId == recipeid)
                {
                    AssociatedRecipeTags.Add(recipetag);
                }
            }

            return AssociatedRecipeTags;
        }

        [HttpDelete("{recipeid}")]
        public ActionResult<Recipe> Delete(int recipeid)
        {
            List<RecipeTag> ToDelete = _db.RecipeTags.Where(r => r.RecipeId == recipeid).ToList();

            foreach(RecipeTag tag in ToDelete)
            {
                _db.RecipeTags.Remove(tag);
                _db.SaveChanges();
            }

            return _db.Recipes.Find(recipeid);
        }
    }
}
