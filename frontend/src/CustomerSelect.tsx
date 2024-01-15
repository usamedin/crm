import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { SERVER_URL } from './utils';

type Props = {
  onCustomerChange: (customer: string) => void
}

export default function CustomerSelect({ onCustomerChange }: Props) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);


  return (
    <div>Select Customer
      <select onChange={(e) => onCustomerChange(e.target.value)}>
        <option value="">
          Select customer
        </option>
        {customers.map((customer: any) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
}
