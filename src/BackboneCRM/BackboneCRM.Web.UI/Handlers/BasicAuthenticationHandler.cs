using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using BackboneCRM.Domain.Models;
using BackboneCRM.Web.UI.Services;
using System.Linq;
using Raven.Client;
using StructureMap;

namespace BackboneCRM.Web.UI.Handlers
{
    public class BasicAuthenticationMessageHandler : DelegatingHandler
    {
        private IDocumentSession session = ObjectFactory.GetInstance<IDocumentSession>();

        public BasicAuthenticationMessageHandler()
        {
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            if (request.Headers.Authorization != null)
            {
                var credentials = ExtractCredentials(request.Headers.Authorization);
                if (credentials != null && ValidateUser(credentials))
                {
                    var identity = new GenericIdentity(credentials.Username, "Basic");
                    var principal = new GenericPrincipal(identity, new string[0]);

                    Thread.CurrentPrincipal = principal;
                    HttpContext.Current.User = principal;
                    //request.Properties.Add(System.Web.Http.Hosting.HttpPropertyKeys., new GenericPrincipal(identity, new string[0]));
                }
            }
            return base.SendAsync(request, cancellationToken);
        }

        private bool ValidateUser(Credentials credentials)
        {
            if (!session.Query<Member>().Where(x => x.Credentials.Username == credentials.Username && x.Credentials.Password == credentials.Password).Any())
            {
                return false;
            }
            return true;
        }

        private Credentials ExtractCredentials(AuthenticationHeaderValue authHeader)
        {
            try
            {
                if (authHeader == null)
                {
                    return null;
                }

                var encodedUserPass = authHeader.Parameter.Trim();

                Credentials credentials;

                if (!Credentials.TryParse(Crypto.DecryptStringAES(encodedUserPass, "authentication"), out credentials))
                {
                    return null;
                }

                return credentials;
            }
            catch
            {
                return null;
            }
        }
    }
}