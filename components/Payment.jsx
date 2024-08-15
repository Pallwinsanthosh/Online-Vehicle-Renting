import React, { useState } from 'react';

function Payment() {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === '') {
      alert('Please enter amount');
    } else {
      if (window.Razorpay) {
        var options = {
          key: 'rzp_test_AWrlyaXOO9ncih',
          key_secret: 'iExGzM7nCvTIo41Rk4iV9kye',
          amount: amount * 100,
          currency: 'INR',
          name: 'Rent My Ride',
          description: 'for testing purpose',
          handler: function (response) {
            alert(response.razorpay_payment_id);
          },
          prefill: {
            name: 'Arshad',
            email: 'arshadsyed2804@gmail.com',
            contact: '8778729928',
          },
          notes: {
            address: 'Razorpay Corporate office',
          },
          theme: {
            color: '#3399cc',
          },
        };
        var pay = new window.Razorpay(options);
        pay.open();
      } else {
        alert('Razorpay SDK not loaded. Make sure to include the Razorpay script.');
      }
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Payment;