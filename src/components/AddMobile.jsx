import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileForm from '../components/MobileForm';
import mobileService from '../services/mobileService';


const AddMobile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (mobileData) => {
    setLoading(true);
    try {
      await mobileService.createMobile(mobileData);
      alert("Mobile added successfully!!");
      navigate('/');
    } catch (error) {
      alert('Error adding mobile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Add New Mobile</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          ← Back to List
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <MobileForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AddMobile;