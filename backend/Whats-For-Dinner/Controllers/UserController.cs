using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Whats_For_Dinner.Models;

namespace Whats_For_Dinner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
        private readonly RecipeCollectionContext _db;
        public UserController(RecipeCollectionContext db)
        {
            _db = db;
        }

        public bool UserExists(int id)
        {
            var user = _db.Users.Find(id);

            return user == null;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _db.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet]
        public ActionResult<User> Get(string username, string password)
        {
            var user = _db.Users.Where(user => user.Username == username && user.Password == password).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {

            if (id != user.Id)
            {
                return BadRequest();
            }

            _db.Entry(user).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
