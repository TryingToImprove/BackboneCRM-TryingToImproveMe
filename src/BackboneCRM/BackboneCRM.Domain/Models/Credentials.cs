using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackboneCRM.Domain.Models
{
    public class Credentials
    {
        private const string Delimiter = ";::|_|::;";

        public string Username { get; set; }
        public string Password { get; set; }

        public static bool TryParse(string value, out Credentials credentials)
        {
            string[] values = value.Split(new string[] { Delimiter }, StringSplitOptions.RemoveEmptyEntries);

            if (values.Length == 2)
            {
                credentials = new Credentials
                {
                    Username = values[0],
                    Password = values[1]
                };

                return true;
            }

            credentials = null;
            return false;
        }

        public override string ToString()
        {
            StringBuilder strBuilder = new StringBuilder();

            strBuilder.Append(Username);
            strBuilder.Append(Delimiter);
            strBuilder.Append(Password);

            return strBuilder.ToString();
        }
    }
}
