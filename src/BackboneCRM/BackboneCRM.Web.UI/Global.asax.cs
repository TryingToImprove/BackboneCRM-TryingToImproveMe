using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using BackboneCRM.Web.UI.Handlers;
using Raven.Client;
using Raven.Client.Document;
using StructureMap;

namespace BackboneCRM.Web.UI
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            ObjectFactory.Initialize(x =>
            {
                x.For<IDocumentStore>()
                    .Singleton()
                    .Use(y =>
                    {
                        IDocumentStore documentStore = new DocumentStore()
                        {
                            Url = "http://localhost:8080"
                        };

                        documentStore.Initialize();
                        documentStore.Conventions.IdentityPartsSeparator = "-";

                        return documentStore;
                    });

                x.For<IDocumentSession>()
                    .HttpContextScoped()
                    .Use(y =>
                    {
                        return y.GetInstance<IDocumentStore>().OpenSession();
                    });
            });

            GlobalConfiguration.Configuration.MessageHandlers.Add(new BasicAuthenticationMessageHandler());
        }
    }
}