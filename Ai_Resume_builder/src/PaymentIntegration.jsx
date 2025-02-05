import React from 'react'
import axios from 'axios'

function PaymentIntegration() {
  const handleBuy = async () => {
    let response = await axios.post('http://localhost:3000/payment')
    if (response && response.statusCode === 200) {
      console.log(response.data);
    }
  } 

  return (
    <div>
      <button onClick={handleBuy}>Buy now</button>
    </div>
  )
}

export default PaymentIntegration