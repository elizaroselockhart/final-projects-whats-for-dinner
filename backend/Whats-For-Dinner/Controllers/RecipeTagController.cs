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

        /* Deletes all RecipeTagsByRecipeID */
        [HttpDelete("{id}")]
        public ActionResult<List<RecipeTag>> Delete(int id)
        {
            var recipeTags = _db.RecipeTags.Where(rt => rt.RecipeId == id);
            foreach(RecipeTag recipeTag in recipeTags)
            {
                _db.RecipeTags.Remove(recipeTag);
                _db.SaveChanges();
            }
            return _db.RecipeTags.ToList();
        }

        [HttpPost]
        public ActionResult<RecipeTag> Post([FromBody] RecipeTag rt)
        {
            _db.RecipeTags.Add(rt);
            _db.SaveChanges();

            return rt;
        }


        //[HttpGet]
        //public ActionResult<IEnumerable<RecipeTag>> Get()
        //{
        //    return _db.RecipeTags.ToList();
        //}

    }
}
