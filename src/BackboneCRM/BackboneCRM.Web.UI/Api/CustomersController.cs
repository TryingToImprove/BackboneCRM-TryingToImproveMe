using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneCRM.Web.UI.Models;
using Raven.Client;
using Raven.Client.Document;
using StructureMap;

namespace BackboneCRM.Web.UI.Api
{
    public class CustomersController : ApiController
    {
        private IDocumentSession session = ObjectFactory.GetInstance<IDocumentSession>();

        [Authorize]
        public HttpResponseMessage Get()
        {
            Customer[] customers = session.Query<Customer>().ToArray();
            HttpResponseMessage response = Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, customers);

            return response;
        }

        [Authorize]
        public HttpResponseMessage Post(Customer customer)
        {
            session.Store(customer);
            session.SaveChanges();

            HttpResponseMessage response = Request.CreateResponse<Customer>(HttpStatusCode.OK, customer);

            return response;
        }
    }
}
