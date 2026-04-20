import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', experience: '12 years', rating: 4.9, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Therapist', experience: '8 years', rating: 4.7, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Dr. Emily Carter', specialty: 'Dentist', experience: '5 years', rating: 4.8, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Therapist', experience: '15 years', rating: 4.9, image: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Dr. Olivia Martinez', specialty: 'Cardiologist', experience: '10 years', rating: 4.6, image: 'https://i.pravatar.cc/150?u=5' }
];

export const AppProvider = ({ children }) => {
  const [doctors] = useState(MOCK_DOCTORS);
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now().toString(), status: 'Upcoming' }]);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider value={{ doctors, appointments, setAppointments, addAppointment, toast, showToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
