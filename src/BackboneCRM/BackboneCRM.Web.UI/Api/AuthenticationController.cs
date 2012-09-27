using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;

namespace BackboneCRM.Web.UI.Api
{
    public class AuthenticationController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage SignIn(string userName, string passWord)
        {
            if (userName.Equals("test", StringComparison.InvariantCultureIgnoreCase) && passWord.Equals("abc123"))
            {
                var a = Request.CreateResponse<string>(HttpStatusCode.OK, "Online");
                a.Headers.AddCookies(new CookieHeaderValue[] { new CookieHeaderValue(FormsAuthentication.FormsCookieName, userName) });

                return a;
            }
            else
            {
                return Request.CreateResponse<string>(HttpStatusCode.NotFound, "User was not found");
            }
        }
    }
}
