using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Hosting;
using System.Web.Security;
using BackboneCRM.Web.UI.Services;

namespace BackboneCRM.Web.UI.Handlers
{
    public class BasicAuthenticationMessageHandler : DelegatingHandler
    {
        private class Credentials
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

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
            if (!credentials.Username.Equals("oliver") && credentials.Password.Equals("test"))
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

                ////throw new Exception(encodedUserPass);
                //var encoding = Encoding.GetEncoding("iso-8859-1");


                //var userPass = encoding.GetString(Convert.FromBase64String(encodedUserPass));
                var userPass = Crypto.DecryptStringAES(encodedUserPass, "authentication");
                var parts = userPass.Split(":".ToCharArray());
                return new Credentials { Username = parts[0], Password = parts[1] };
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}