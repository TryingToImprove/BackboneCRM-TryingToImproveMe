using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BackboneCRM.Web.UI.Controllers
{
    public class CustomersController : Controller
    {
        //
        // GET: /Customers/

        public ActionResult Upload(HttpPostedFileBase customerImage)
        {
            //Create filename and path
            string fileName = Guid.NewGuid() + System.IO.Path.GetExtension(customerImage.FileName);
            string path = "Content/Uploads/Customers";

            //Save the image
            customerImage.SaveAs(Server.MapPath("~/" + Path.Combine(path, fileName)));

            //Return the path as a json-string
            return Json(Path.Combine(path, fileName));
        }

    }
}
