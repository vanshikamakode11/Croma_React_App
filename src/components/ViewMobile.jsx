import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import mobileService from '../services/mobileService';

const ViewMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    loadMobile();
  }, [id]);

  const loadMobile = async () => {
    try {
      setLoading(true);
      const data = await mobileService.getMobileById(id);
      setMobile(data);
      setError(null);
    } catch (err) {
      setError('Failed to load mobile details. Please try again.');
      console.error('Error loading mobile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading Mobile Details...</h4>
        </div>
      </div>
    );
  }

  if (error || !mobile) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow">
          <div className="card-body text-center py-5">
            <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '3rem' }}></i>
            <h3 className="mt-3">Mobile Not Found</h3>
            <p className="text-muted">{error || 'The mobile you are looking for does not exist.'}</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-primary" onClick={loadMobile}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Try Again
              </button>
              <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                <i className="bi bi-house me-2"></i>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-house me-1"></i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {mobile.brand} {mobile.model}
          </li>
        </ol>
      </nav>

      {/* Header with Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">{mobile.brand} {mobile.model}</h1>
          <p className="text-muted mb-0">Mobile Phone Details</p>
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
          <Link 
            to={`/edit/${mobile.id}`} 
            className="btn btn-warning"
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      <div className="row">
        {/* Image Section */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              {mobile.imageUrl && !imageError ? (
                <img 
                  src={mobile.imageUrl} 
                  className="img-fluid rounded-top"
                  alt={`${mobile.brand} ${mobile.model}`}
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  onError={handleImageError}
                />
              ) : (
                <div 
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ height: '400px' }}
                >
                  <div className="text-center text-muted">
                    <i className="bi bi-phone" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
                    <p className="mt-3 mb-0">No Image Available</p>
                  </div>
                </div>
              )}
              
              {/* Stock Status Badge */}
              <div className="position-absolute top-0 end-0 m-3">
                <span className={`badge ${mobile.inStock ? 'bg-success' : 'bg-danger'} fs-6 p-2`}>
                  <i className={`bi ${mobile.inStock ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                  {mobile.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              {/* Price */}
              <div className="text-center mb-4">
                <h2 className="text-primary fw-bold">${mobile.price}</h2>
                <small className="text-muted">Excluding taxes and fees</small>
              </div>

              {/* Specifications */}
              <h5 className="border-bottom pb-2 mb-4">
                <i className="bi bi-list-check me-2"></i>
                Specifications
              </h5>

              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <i className="bi bi-tag text-white"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Brand</small>
                      <span className="fw-medium">{mobile.brand}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <i className="bi bi-grid-1x2 text-white"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Model</small>
                      <span className="fw-medium">{mobile.model}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <i className="bi bi-hdd text-white"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Storage</small>
                      <span className="fw-medium">{mobile.storage}GB</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <i className="bi bi-palette text-white"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Color</small>
                      <span className="fw-medium">{mobile.color}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <i className="bi bi-check2-circle text-white"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Availability</small>
                      <span className={`fw-medium ${mobile.inStock ? 'text-success' : 'text-danger'}`}>
                        {mobile.inStock ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <i className="bi bi-currency-dollar text-white"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">Price Category</small>
                      <span className="fw-medium">
                        {mobile.price > 800 ? 'Premium' : mobile.price > 500 ? 'Mid-range' : 'Budget'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-top pt-4 mt-4">
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <Link 
                    to={`/edit/${mobile.id}`} 
                    className="btn btn-warning me-md-2"
                  >
                    <i className="bi bi-pencil me-2"></i>
                    Edit Mobile
                  </Link>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={handleBack}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">
                <i className="bi bi-info-circle me-2"></i>
                Additional Information
              </h5>
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center p-3">
                    <i className="bi bi-truck text-primary" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2">Free Shipping</h6>
                    <p className="text-muted small mb-0">On all orders over $500</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3">
                    <i className="bi bi-shield-check text-primary" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2">1 Year Warranty</h6>
                    <p className="text-muted small mb-0">Manufacturer warranty included</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3">
                    <i className="bi bi-arrow-left-right text-primary" style={{ fontSize: '2rem' }}></i>
                    <h6 className="mt-2">30-Day Returns</h6>
                    <p className="text-muted small mb-0">Easy return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMobile;