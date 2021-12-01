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
        //[HttpPost]
        //public ActionResult<RecipeTag> Post([FromBody] RecipeTag recipetag, int recipeId, int tagId)
        //{
        //    _db.RecipeTags.Add(recipetag);
        //    recipetag.Recipe = _db.Recipes.Find(recipeId);
        //    recipetag.Tag = _db.Tags.Find(tagId);
        //    _db.SaveChanges();

        //    return recipetag;
        //}


        //[HttpGet]
        //public ActionResult<IEnumerable<RecipeTag>> Get()
        //{
        //    return _db.RecipeTags.ToList();
        //}

    }
}
