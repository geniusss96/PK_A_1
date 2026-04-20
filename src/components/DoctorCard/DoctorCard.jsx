import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Button } from '../UI/Button';
import './DoctorCard.css';

export const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="glass-panel doctor-card">
      <div className="doctor-image-wrapper">
        <img src={doctor.image} alt={doctor.name} className="doctor-image" loading="lazy" />
      </div>
      <div className="doctor-info">
        <div className="doctor-header">
          <div>
            <h3 className="doctor-name">{doctor.name}</h3>
            <span className="doctor-specialty">{doctor.specialty}</span>
          </div>
        </div>
        
        <div className="doctor-meta">
          <div className="meta-item rating">
            <Star size={16} fill="currentColor" /> {doctor.rating}
          </div>
          <div className="meta-item">
            <Clock size={16} /> {doctor.experience}
          </div>
        </div>
        
        <Button className="book-btn" variant="primary" onClick={() => onBook(doctor)}>
          Book Appointment
        </Button>
      </div>
    </div>
  );
};
