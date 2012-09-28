﻿using System;
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

        public HttpResponseMessage Get()
        {
            var customers = session.Query<Customer>().ToArray();

            var response = Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, customers);

            return response;
        }
    }
}
