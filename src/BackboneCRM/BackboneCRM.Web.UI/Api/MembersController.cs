using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneCRM.Domain.Models;
using Raven.Client;
using StructureMap;

namespace BackboneCRM.Web.UI.Api
{
    public class MembersController : ApiController
    {
        private IDocumentSession session = ObjectFactory.GetInstance<IDocumentSession>();

        public HttpResponseMessage Get()
        {
            Member member = new Member
            {
                FirstName = "Oliver",
                LastName = "Lassen",
                Credentials = new Credentials
                {
                    Username = "OLL",
                    Password = "test"
                }
            };
            session.Store(member);
            session.SaveChanges();

            return Request.CreateResponse<Member>(HttpStatusCode.OK, member);
        }
    }
}
