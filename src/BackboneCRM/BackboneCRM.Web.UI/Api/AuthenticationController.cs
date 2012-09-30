using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;
using BackboneCRM.Web.UI.Services;

namespace BackboneCRM.Web.UI.Api
{
    public class AuthenticationController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage SignIn(string userName, string passWord)
        {
            if (userName.Equals("test", StringComparison.InvariantCultureIgnoreCase) && passWord.Equals("abc123"))
            {
                var a = Request.CreateResponse<string>(HttpStatusCode.OK, Crypto.EncryptStringAES("oliver:test", "authentication"));
                
                return a;
            }
            else
            {
                return Request.CreateResponse<string>(HttpStatusCode.NotFound, "User was not found");
            }
        }
    }
}
