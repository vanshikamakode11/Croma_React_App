import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileList from '../components/MobileList';
import mobileService from '../services/mobileService';

const Home = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInStock, setFilterInStock] = useState(false);

  useEffect(() => {
    loadMobiles();
  }, []);

  const loadMobiles = async () => {
    try {
      setLoading(true);
      const data = await mobileService.getAllMobiles();
      setMobiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load mobiles. Please try again later.');
      console.error('Error loading mobiles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mobile?')) {
      try {
        await mobileService.deleteMobile(id);
        setMobiles(mobiles.filter(mobile => mobile.id !== id));
      } catch (err) {
        alert('Error deleting mobile: ' + err.message);
      }
    }
  };

  const handleRefresh = () => {
    loadMobiles();
  };

  // Filter mobiles based on search term and stock filter
  const filteredMobiles = mobiles.filter(mobile => {
    const matchesSearch = mobile.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mobile.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mobile.color.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStock = !filterInStock || mobile.inStock;
    
    return matchesSearch && matchesStock;
  });

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">📱 Mobile Store</h1>
          <p className="text-muted">Browse our collection of mobile phones</p>
        </div>
        <Link to="/add" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Mobile
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{mobiles.length}</h5>
              <p className="card-text">Total Mobiles</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-success">
                {mobiles.filter(m => m.inStock).length}
              </h5>
              <p className="card-text">In Stock</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-danger">
                {mobiles.filter(m => !m.inStock).length}
              </h5>
              <p className="card-text">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="search" className="form-label">Search Mobiles</label>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search by brand, model, or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Filter</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="inStockFilter"
                  checked={filterInStock}
                  onChange={(e) => setFilterInStock(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="inStockFilter">
                  Show only in stock
                </label>
              </div>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  'Refresh'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>
          {filteredMobiles.length} {filteredMobiles.length === 1 ? 'Mobile' : 'Mobiles'} Found
        </h5>
        {searchTerm && (
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading mobiles...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
          <button className="btn btn-sm btn-outline-danger mt-2" onClick={loadMobiles}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredMobiles.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-phone" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
          </div>
          <h4>No mobiles found</h4>
          <p className="text-muted mb-4">
            {searchTerm || filterInStock 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first mobile phone!'
            }
          </p>
          {!searchTerm && !filterInStock && (
            <Link to="/add" className="btn btn-primary">
              Add Your First Mobile
            </Link>
          )}
          {(searchTerm || filterInStock) && (
            <button 
              className="btn btn-outline-primary"
              onClick={() => {
                setSearchTerm('');
                setFilterInStock(false);
              }}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Mobile List */}
      {!loading && !error && filteredMobiles.length > 0 && (
        <MobileList 
          mobiles={filteredMobiles} 
          onDelete={handleDelete}
        />
      )}

      {/* Quick Actions */}
      {!loading && mobiles.length > 0 && (
        <div className="mt-5 pt-4 border-top">
          <h5 className="mb-3">Quick Actions</h5>
          <div className="d-flex gap-2">
            <Link to="/add" className="btn btn-outline-primary">
              Add Another Mobile
            </Link>
            <button 
              className="btn btn-outline-secondary"
              onClick={handleRefresh}
            >
              Refresh List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;