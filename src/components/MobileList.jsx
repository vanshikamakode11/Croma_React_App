import React from 'react';
import MobileItem from './MobileItem';

const MobileList = ({ mobiles, onDelete }) => {
  if (!mobiles || mobiles.length === 0) {
    return null; // This should be handled by the parent component
  }

  return (
    <div className="mobile-list">
      {mobiles.map(mobile => (
        <MobileItem 
          key={mobile.id} 
          mobile={mobile} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default MobileList;