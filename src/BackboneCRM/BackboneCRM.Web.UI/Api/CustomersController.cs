using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneCRM.Web.UI.Models;
using Raven.Client;
using Raven.Client.Document;

namespace BackboneCRM.Web.UI.Api
{
    public class CustomersController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DocumentStore documentStore = new DocumentStore()
            {
                Url = "http://localhost:8080"
            };
            documentStore.Initialize();
            documentStore.Conventions.IdentityPartsSeparator = "-";

            using (IDocumentSession session = documentStore.OpenSession())
            {
                var customers = session.Query<Customer>().ToArray();

                var response = Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, customers);

                return response;
            }
        }
    }
}
