import React, { useEffect, useState } from 'react';
import './App.css';
import CustomerSelect from './CustomerSelect';
import Orders from './Orders';

function App() {
  const [customer, setCustomer] = useState<string>();

  return (
    <div className="App">
      <header className="App-header">
        <CustomerSelect onCustomerChange={setCustomer} />
      </header>
      <Orders customer={customer} />
    </div>
  );
}

export default App;
