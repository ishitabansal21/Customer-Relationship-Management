import React, { useState, useEffect } from "react";
import axios from "axios";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filters, setFilters] = useState({
    totalSpend: false,
    maxVisits: false,
    notVisited: false,
  });
  const [audienceSize, setAudienceSize] = useState(0);
  const [showAudienceSize, setShowAudienceSize] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  const applyFilters = () => {
    let filtered = customers;

    if (filters.totalSpend) {
      filtered = filtered.filter((customer) => customer.totalSpends > 10000);
    }

    if (filters.maxVisits) {
      filtered = filtered.filter((customer) => customer.visits === 3);
    }

    if (filters.notVisited) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filtered = filtered.filter(
        (customer) => new Date(customer.lastVisit) < threeMonthsAgo
      );
    }

    setFilteredCustomers(filtered);
  };

  const checkAudienceSize = () => {
    setShowAudienceSize(!showAudienceSize);
    setAudienceSize(filteredCustomers.length);
  };

  return (
    <div>
      <h1 className="heading">Customer Relationship Management</h1>
      <div className="allfilters">
        <label>
          <input
            type="checkbox"
            name="totalSpend"
            checked={filters.totalSpend}
            onChange={handleFilterChange}
          />
          Get Customers with Total Spend Greater Than 10000
        </label>
        <label>
          <input
            type="checkbox"
            name="maxVisits"
            checked={filters.maxVisits}
            onChange={handleFilterChange}
          />
          Get Customers with Max Number of Visits 3
        </label>
        <label>
          <input
            type="checkbox"
            name="notVisited"
            checked={filters.notVisited}
            onChange={handleFilterChange}
          />
          Get Customers who have Not Visited in Last 3 Months
        </label>
      </div>
      <div className="button-div">
        <button className="button-1" onClick={checkAudienceSize}>
          {showAudienceSize ? "Hide Audience Size" : "Check Audience Size"}
        </button>
        {showAudienceSize && <p>Audience Size: {audienceSize}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spends</th>
            <th>Visits</th>
            <th>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.totalSpends}</td>
              <td>{customer.visits}</td>
              <td>{new Date(customer.lastVisit).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCustomers;
