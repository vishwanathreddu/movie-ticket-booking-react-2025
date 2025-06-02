// src/components/booking/SeatLegend.jsx
import React from 'react';

function SeatLegend() {
  return (
    <div className="seat-legend">
      <div className="legend-item">
        <div className="legend-box seat-available"></div>
        <span>Available</span>
      </div>
      <div className="legend-item">
        <div className="legend-box seat-selected"></div>
        <span>Selected</span>
      </div>
      <div className="legend-item">
        <div className="legend-box seat-booked"></div>
        <span>Booked</span>
      </div>
      <div className="legend-item">
        <div className="legend-box seat-premium"></div>
        <span>Premium</span>
      </div>
    </div>
  );
}

export default SeatLegend;