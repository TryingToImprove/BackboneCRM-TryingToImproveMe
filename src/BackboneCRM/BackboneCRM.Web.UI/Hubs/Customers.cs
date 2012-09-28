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
        public void AddCustomer(Customer customer)
        {
            int id = (new Random()).Next(100, 1000000);

            customer.Id = id.ToString();

            Clients.customerAdded(customer);
        }

        public void UpdateCustomer(Customer customer)
        {
            Clients.customerUpdated(customer);
        }
    }
}