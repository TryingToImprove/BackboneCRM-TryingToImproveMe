using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackboneCRM.Web.UI.Models;
using Raven.Client;
using SignalR.Hubs;
using StructureMap;

namespace BackboneCRM.Web.UI.Hubs
{
    public class Customers : Hub
    {
        private IDocumentSession session = ObjectFactory.GetInstance<IDocumentSession>();

        public void AddCustomer(Customer customer)
        {
            Clients.customerAdded(customer);
        }

        public void UpdateCustomer(Customer customer)
        {
            if (string.IsNullOrWhiteSpace(customer.Id)) throw new ArgumentNullException("Customer Id can not be null");

            Customer cust = session.Load<Customer>(customer.Id);
            cust.Name = customer.Name;
            cust.Money = customer.Money;

            session.SaveChanges();

            Clients.customerUpdated(customer);
        }
    }
}