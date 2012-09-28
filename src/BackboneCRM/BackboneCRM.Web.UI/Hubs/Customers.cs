using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackboneCRM.Web.UI.Models;
using SignalR.Hubs;

namespace BackboneCRM.Web.UI.Hubs
{
    public class Customers : Hub
    {
        public void AddCustomer(int appId, Customer customer)
        {
            Clients.customerAdded(appId, customer);
        }
    }
}