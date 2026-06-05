import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileItem = ({ mobile, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(mobile.id);
    } catch (error) {
      console.error('Error deleting mobile:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getStockBadgeClass = () => {
    return mobile.inStock ? 'bg-success' : 'bg-danger';
  };

  const getStockIcon = () => {
    return mobile.inStock ? 'bi-check-circle' : 'bi-x-circle';
  };

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="row g-0">
        {/* Mobile Image Section */}
        <div className="col-md-3">
          {mobile.imageUrl && !imageError ? (
            <img 
              src={mobile.imageUrl} 
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt={`${mobile.brand} ${mobile.model}`}
              style={{ 
                objectFit: 'cover', 
                height: '200px', 
                width: '100%',
                minHeight: '200px'
              }}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div 
              className="d-flex align-items-center justify-content-center bg-light h-100"
              style={{ 
                height: '200px', 
                minHeight: '200px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
              }}
            >
              <div className="text-center text-muted">
                <i className="bi bi-phone" style={{ fontSize: '2.5rem', opacity: 0.5 }}></i>
                <p className="mt-2 mb-0 small">No Image Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Details Section */}
        <div className="col-md-9">
          <div className="card-body h-100 d-flex flex-column">
            {/* Header with title and price */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="flex-grow-1">
                <h5 className="card-title text-dark mb-1 fw-bold">
                  {mobile.brand} {mobile.model}
                </h5>
                <span className={`badge ${getStockBadgeClass()} me-2`}>
                  <i className={`bi ${getStockIcon()} me-1`}></i>
                  {mobile.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="badge bg-secondary">
                  <i className="bi bi-hdd me-1"></i>
                  {mobile.storage}GB
                </span>
              </div>
              <div className="text-end">
                <div className="text-primary fw-bold fs-4">${mobile.price}</div>
                <small className="text-muted">+ tax</small>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="row mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-palette me-3 text-primary" style={{ width: '20px' }}></i>
                  <div>
                    <small className="text-muted d-block">Color</small>
                    <span className="fw-medium">{mobile.color}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-tag me-3 text-primary" style={{ width: '20px' }}></i>
                  <div>
                    <small className="text-muted d-block">Brand</small>
                    <span className="fw-medium">{mobile.brand}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto d-flex flex-wrap gap-2">
              <Link 
                to={`/view/${mobile.id}`} 
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
              >
                <i className="bi bi-eye me-2"></i>
                View Details
              </Link>
              
              <Link 
                to={`/edit/${mobile.id}`} 
                className="btn btn-outline-warning btn-sm d-flex align-items-center"
              >
                <i className="bi bi-pencil me-2"></i>
                Edit
              </Link>
              
              <button 
                onClick={handleDeleteClick}
                className="btn btn-outline-danger btn-sm d-flex align-items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash me-2"></i>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete <strong>{mobile.brand} {mobile.model}</strong>?
                </p>
                <p className="text-muted small">
                  This action cannot be undone. All information about this mobile will be permanently removed.
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Deleting...
                    </>
                  ) : (
                    'Yes, Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileItem;