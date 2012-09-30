using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneCRM.Domain.Models;
using BackboneCRM.Web.UI.Services;
using Raven.Client;
using Raven.Client.Linq;
using StructureMap;
using System.Linq;

namespace BackboneCRM.Web.UI.Api
{
    public class AuthenticationController : ApiController
    {
        private IDocumentSession session = ObjectFactory.GetInstance<IDocumentSession>();


        [HttpPost]
        public HttpResponseMessage SignIn(string username, string password)
        {
            var foundMembers = session.Query<Member>().Where(x => x.Credentials.Username == username && x.Credentials.Password == password);

            if (foundMembers.Any())
            {
                var member = foundMembers.First();
                
                var a = Request.CreateResponse<string>(HttpStatusCode.OK, Crypto.EncryptStringAES(member.Credentials.ToString(), "authentication"));

                return a;
            }
            else
            {
                return Request.CreateResponse<string>(HttpStatusCode.NotFound, "User was not found");
            }
        }
    }
}
