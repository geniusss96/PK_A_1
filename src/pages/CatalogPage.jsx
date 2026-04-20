import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { DoctorCard } from '../components/DoctorCard/DoctorCard';
import { Modal } from '../components/UI/Modal';
import { BookingFlow } from '../components/BookingFlow/BookingFlow';
import './CatalogPage.css';

const SPECIALTIES = ['All', 'Cardiologist', 'Therapist', 'Dentist', 'Neurologist'];

export const CatalogPage = () => {
  const { doctors } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = useMemo(() => {
    if (activeFilter === 'All') return doctors;
    return doctors.filter(doc => doc.specialty === activeFilter);
  }, [doctors, activeFilter]);

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1 className="catalog-title">Find Your Specialist</h1>
        <p className="catalog-subtitle">
          Book an appointment with top-rated medical professionals in your area.
        </p>
      </div>

      <div className="filters-wrapper">
        {SPECIALTIES.map(specialty => (
          <button
            key={specialty}
            className={`filter-btn ${activeFilter === specialty ? 'active' : ''}`}
            onClick={() => setActiveFilter(specialty)}
          >
            {specialty}
          </button>
        ))}
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="doctors-grid">
          {filteredDoctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onBook={setSelectedDoctor} 
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No doctors found for the selected specialty.</p>
        </div>
      )}

      <Modal 
        isOpen={!!selectedDoctor} 
        onClose={() => setSelectedDoctor(null)}
        title={selectedDoctor ? `Book Appointment with ${selectedDoctor.name}` : ''}
      >
        {selectedDoctor && (
          <BookingFlow 
            doctor={selectedDoctor} 
            onClose={() => setSelectedDoctor(null)} 
          />
        )}
      </Modal>
    </div>
  );
};
