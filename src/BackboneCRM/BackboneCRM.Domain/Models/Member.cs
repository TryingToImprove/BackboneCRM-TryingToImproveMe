using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackboneCRM.Domain.Models
{
    public class Member
    {
        public string Id { get; set; }

        public Credentials Credentials { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
