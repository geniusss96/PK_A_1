import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useAppContext } from '../../context/AppContext';
import './BookingFlow.css';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', 
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
];

// Generate next 5 days
const getNextDays = () => {
  const days = [];
  for (let i = 1; i <= 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
};

export const BookingFlow = ({ doctor, onClose }) => {
  const { addAppointment, showToast, appointments } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', complaint: '' });

  const dates = getNextDays();

  // Simple availability logic: filter out slots already booked
  const availableSlots = TIME_SLOTS.filter(slot => {
    return !appointments.some(
      app => app.doctorId === doctor.id && app.date === selectedDate && app.time === slot
    );
  });

  const handleNext = () => setStep(step + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.image,
      date: selectedDate,
      time: selectedTime,
      patientDetail: formData
    });
    showToast('Appointment booked successfully!');
    onClose();
  };

  return (
    <div className="booking-flow">
      {step === 1 && (
        <div className="step-1">
          <div className="booking-step-title">
            <Calendar size={20} /> Select Date
          </div>
          <div className="date-grid">
            {dates.map(date => (
              <button 
                key={date} 
                className={`date-btn ${selectedDate === date ? 'active' : ''}`}
                onClick={() => { setSelectedDate(date); setSelectedTime(''); }}
              >
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>

          {selectedDate && (
            <>
              <div className="booking-step-title" style={{ marginTop: '1.5rem' }}>
                <Clock size={20} /> Select Time
              </div>
              <div className="time-slots">
                {availableSlots.length > 0 ? availableSlots.map(time => (
                  <button 
                    key={time} 
                    className={`time-btn ${selectedTime === time ? 'active' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                )) : (
                  <p style={{color: 'var(--color-text-muted)'}}>No slots available on this date.</p>
                )}
              </div>
            </>
          )}

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={!selectedDate || !selectedTime} onClick={handleNext}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="step-2">
          <div className="booking-step-title">
            <User size={20} /> Patient Details
          </div>
          <Input 
            label="Full Name" 
            required 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            placeholder="John Doe"
          />
          <Input 
            label="Phone Number" 
            required 
            type="tel"
            value={formData.phone} 
            onChange={e => setFormData({ ...formData, phone: e.target.value })} 
            placeholder="+1 234 567 8900"
          />
          <Input 
            label="Main Complaint" 
            required 
            value={formData.complaint} 
            onChange={e => setFormData({ ...formData, complaint: e.target.value })} 
            placeholder="E.g. Headache for 2 weeks"
          />

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="ghost" type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit">
              Confirm Booking
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
