import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { SERVER_URL } from './utils';
import './Orders.css'

type Props = {
  customer: string | undefined
}

export default function Orders({ customer }: Props) {
  const [orders, setOrders] = useState([]);
  const [followUpOrders, setFollowUpOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/orders/${customer}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    if (customer)
      fetchOrders();
  }, [customer]);

  function selectOrder(checked: boolean, orderId: string) {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders([...selectedOrders.filter(id => id !== orderId)])
    }
  }

  function addToFollowUpList() {
    setFollowUpOrders([...orders.filter((order: any) => selectedOrders.includes(order.id))])
    setSelectedOrders([])
  }

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ?
        <div>No orders</div>
        :
        <div>
          <table className='orders' >
            <thead>
              <tr>
                <td></td>
                <th>Order ID</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (<Order key={order.id} order={order} selectOrder={selectOrder} />))}
            </tbody>
          </table >
          <button onClick={addToFollowUpList} >Add To Followup List</button>
        </div>}


      <h1>Follow-up Orders</h1>
      {followUpOrders.length === 0 ?
        <div>No orders</div>
        :
        <div>
          <table className='orders' >
            <thead>
              <tr>
                <td></td>
                <th>Order ID</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (<Order key={order.id} order={order} selectOrder={selectOrder} />))}
            </tbody>
          </table>
        </div>}
    </div>
  );
}

function Order({ order, selectOrder }: any) {
  return (
    <tr>
      <td><input type='checkbox' onChange={(e) => selectOrder(e.target.checked, order.id)} /></td>
      <td>{order.id}</td>
      <td>{order.date}</td>
      <td>{order.quantity}</td>
      <td>{order.totalPrice}</td>
    </tr>
  )
}