import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MobileForm from '../components/MobileForm';
import mobileService from '../services/mobileService';

const EditMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadMobile();
  });

  const loadMobile = async () => {
    try {
      const data = await mobileService.getMobileById(id);
      setMobile(data);
    } catch (error) {
      alert('Error loading mobile: ' + error.message);
      navigate('/');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (mobileData) => {
    setLoading(true);
    try {
      await mobileService.updateMobile(id, mobileData);
      navigate('/');
    } catch (error) {
      alert('Error updating mobile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Mobile</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          ← Back to List
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <MobileForm 
            initialData={mobile} 
            onSubmit={handleSubmit} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditMobile;