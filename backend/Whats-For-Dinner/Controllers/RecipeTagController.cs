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
        public ActionResult<RecipeTag> Post([FromBody] RecipeTag recipetag)
        {
            _db.RecipeTags.Add(recipetag);
            _db.SaveChanges();

            return recipetag;
        }
    }
}
