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
    public class TagController : ControllerBase
    {
        private readonly RecipeCollectionContext _db;
        public TagController(RecipeCollectionContext db)
        {
            _db = db;
        }

        /* HTTPPost (Create) Method goes here! */
        [HttpPost]
        public ActionResult<IEnumerable<Tag>> Post([FromBody] Tag tag)
        {
            _db.Tags.Add(tag);
            _db.SaveChanges();


            return _db.Tags.ToList();
        }

        /* HTTPGet (Read) Method goes here! We need two methods: one returns an individual recipe (by ID) and one that returns a list. */

        [HttpGet]
        public ActionResult<IEnumerable<Tag>> Get()
        {
            return _db.Tags.ToList();
        }

        /* HTTPPut (Update) method goes here! */
        [HttpPut("{id}")]
        public ActionResult<IEnumerable<Tag>> Put(int id, [FromBody] Tag tag)
        {
            if (tag.Id == id)
            {
                _db.Tags.Update(tag);
                _db.SaveChanges();
            }

            return _db.Tags.ToList();
        }

        /* HTTPDelete method goes here. */
        [HttpDelete("{id}")]
        public ActionResult<List<Tag>> Delete(int id)
        {
            var tag = _db.Tags.Find(id);
            _db.Tags.Remove(tag);
            _db.SaveChanges();

            return _db.Tags.ToList();
        }
    }
}
