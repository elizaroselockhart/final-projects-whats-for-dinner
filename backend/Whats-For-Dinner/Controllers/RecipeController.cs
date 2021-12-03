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
    public class RecipeController : ControllerBase
    {
        private readonly RecipeCollectionContext _db;
        public RecipeController(RecipeCollectionContext db)
        {
            _db = db;
        }

        /* HTTPPost (Create) Method goes here! */
        [HttpPost]
        public ActionResult<Recipe> Post([FromBody] Recipe recipe)
        {
            _db.Recipes.Add(recipe);
            _db.SaveChanges();

            return recipe;
        }

        /* HTTPGet (Read) Method goes here! We need two methods: one returns an individual recipe (by ID) and one that returns a list. */

        [HttpGet]
        public ActionResult<IEnumerable<Recipe>> Get()
        {
            return _db.Recipes.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Recipe> Get(int id)
        {
            var recipe = _db.Recipes.Find(id);
            return recipe;
        }

        /* HTTPPut (Update) method goes here! */
        [HttpPut("{id}")]
        public ActionResult<Recipe> Put(int id, [FromBody] Recipe recipe)
        {
            //1. 

            for(int i =0; i < recipe.Tags.Count; i++)
            {
                if(recipe.Tags[i].Id == 0)
                {
                    //Check to see if tag exists
                    var existingTag = _db.Tags.Where(t => t.Name == recipe.Tags[i].Name).FirstOrDefault();

                    //If tag 
                    if(existingTag == null)
                    {
                        //Add Tag
                        existingTag = new Tag(recipe.Tags[i].Name);
                        _db.Tags.Add(existingTag);
                        _db.SaveChanges();
                        
                    }

                    recipe.Tags[i] = existingTag;
                    //If it does exist, let tag = db.Find(tagId)
                }
                else
                {
                    recipe.Tags[i] = _db.Tags.Find(recipe.Tags[i].Id);
                }
            }
            foreach(Tag tag in recipe.Tags)
            {
                // check to see if recipe tag with recipe.id and tag.id exists
                // if not , create it and add to database
                //if it does, who cares
            }
            

            if (recipe.Id == id)
            {
                _db.Recipes.Update(recipe);
                _db.SaveChanges();
            }

            return recipe;
        }

        /* HTTPDelete method goes here. */
        [HttpDelete("{id}")]
        public ActionResult<List<Recipe>> Delete(int id)
        {
            var recipe = _db.Recipes.Find(id);
            _db.Recipes.Remove(recipe);
            _db.SaveChanges();

            return _db.Recipes.ToList();
        }
    }
}
