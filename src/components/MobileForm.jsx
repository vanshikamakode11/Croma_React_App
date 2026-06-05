import React, { useState } from 'react';

const MobileForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    brand: initialData.brand || '',
    model: initialData.model || '',
    price: initialData.price || '',
    storage: initialData.storage || '',
    color: initialData.color || '',
    inStock: initialData.inStock !== undefined ? initialData.inStock : true,
    imageUrl: initialData.imageUrl || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert price and storage to numbers
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      storage: parseInt(formData.storage)
    };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="brand" className="form-label">Brand *</label>
        <input
          type="text"
          className="form-control"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="model" className="form-label">Model *</label>
        <input
          type="text"
          className="form-control"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="price" className="form-label">Price ₹ *</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="storage" className="form-label">Storage (GB) *</label>
        <input
          type="number"
          className="form-control"
          id="storage"
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="color" className="form-label">Color *</label>
        <input
          type="text"
          className="form-control"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inStock">
            In Stock
          </label>
        </div>
      </div>

      <div className="col-12">
        <label htmlFor="imageUrl" className="form-label">Image URL</label>
        <input
          type="url"
          className="form-control"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {formData.imageUrl && (
        <div className="col-12">
          <label className="form-label">Image Preview</label>
          <div>
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              style={{ maxWidth: '200px', maxHeight: '200px' }}
              className="img-thumbnail"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      <div className="col-12">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}>
          {loading ? 'Saving...' : 'Save Mobile'}
        </button>
      </div>
    </form>
  );
};

export default MobileForm;