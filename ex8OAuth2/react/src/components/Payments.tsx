import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const Payments = () => {
    const [amount, setAmount] = useState(0);


    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
      });
    
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
    };

    const handlePayNowClick = (e: any) => {
        e.preventDefault()

        // console.log(formData)

        axios.post('http://localhost:1323/pay', {formData, amount})
            .then(res => {
                console.log('Payment added successfully');
                console.log(res.data);
              })
            .catch(error => {
                console.error('Error adding payment:', error);
            });
        setFormData({
          name: '',
          surname: '',
          email: ''
        });
        setAmount(0);
    };

    return (
        <div>
        <h2>Add new payment</h2>
        <form id="form">
          <div>
            <label>Name:</label>
            <input type="text" name="name" placeholder='name' value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Surname:</label>
            <input type="text" name="surname" placeholder='surname' value={formData.surname} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" placeholder='email' value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Cash amount:</label>
            <input type="text" name="money" value={amount} onChange={handleAmountChange} />
          </div>
          <button type="submit" onClick={handlePayNowClick}>Add payment</button>
        </form>
      </div>
    );
}

export default Payments;