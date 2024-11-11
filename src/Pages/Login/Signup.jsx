import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    pin: '',
    contact: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    if ((id === 'pin' || id === 'contact') && !/^\d*$/.test(value)) {
      return; // Only allow numeric values
    }
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = () => {
    const { name, email, address, pin, contact } = formData;
    if (!name || !email || !address || !pin || !contact) {
      return 'All fields are required.';
    }
    if (!/^\d{4}$/.test(pin)) {
      return 'PIN should be exactly 4 digits.';
    }
    if (!/^\d{10}$/.test(contact)) {
      return 'Contact number should be exactly 10 digits.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const checkDuplicateContact = async (contact) => {
    try {
      const response = await axios.get('http://localhost:8080/atm/user/validateContactNumber', {
        params: { contact }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking contact number:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const isDuplicate = await checkDuplicateContact(formData.contact);
    if (isDuplicate) {
      setError('User already present with this contact number.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/atm/user/create', formData);
      console.log('User registered:', response.data);
      // You can add more actions here, like redirecting the user to another page
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#db0011', color: '#ffffff' }}>
          <h1>Welcome to Our Service</h1>
          <p>Join us to experience the best in class service.</p>
          <img src="../home.webp" alt="Welcome" className="img-fluid" style={{ maxWidth: '80%', borderRadius: '10px' }} />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="container" style={{ maxWidth: '550px' }}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center" style={{ color: '#db0011' }}>Register</h3>
                <form onSubmit={handleSubmit}>
                  <div className='d-flex'>
                    <div className="mb-3" style={{ marginRight: '25px' }}>
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className="mb-3" style={{ marginRight: '25px' }}>
                      <label htmlFor="address" className="form-label">Address</label>
                      <input type="text" className="form-control" id="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pin" className="form-label">PIN</label>
                      <input type="password" className="form-control" id="pin" placeholder="Enter PIN" value={formData.pin} onChange={handleChange} />
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className="mb-3" style={{ marginRight: '25px' }}>
                      <label htmlFor="contact" className="form-label">Contact No</label>
                      <input type="text" className="form-control" id="contact" placeholder="Enter Contact No" value={formData.contact} onChange={handleChange} />
                    </div>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#FF7F50', borderColor: '#FF7F50' }}>Register</button>
                </form>
                <div className="mt-3 text-center">
                  <p>Already have an account? <Link to="/login" style={{ color: '#FF7F50' }}>Login here</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
