using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Whats_For_Dinner.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

        public User() { }

        public User(int id, string name, string username, string password)
        {
            Id = id;
            Name = name;
            Username = username;
            Password = password;

        }
    }
}
