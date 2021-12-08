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
    public class SearchDataController : ControllerBase
    {
        private readonly RecipeCollectionContext _db;
        public SearchDataController(RecipeCollectionContext db)
        {
            _db = db;
        }

        /* HTTPGet (Read) Method goes here! We need two methods: one returns an individual recipe (by ID) and one that returns a list. */

        [HttpGet]
        public ActionResult<SearchData> Get()
        {
            return new SearchData(_db.Recipes.ToList(), _db.Tags.ToList());
        }
    }
}
