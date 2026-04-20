import React from 'react';
import { useAppContext } from '../context/AppContext';
import './MyAppointmentsPage.css';

export const MyAppointmentsPage = () => {
  const { appointments } = useAppContext();

  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="appointments-page">
      <h1 className="page-title">My Appointments</h1>
      
      {sortedAppointments.length > 0 ? (
        <div className="appointments-list">
          {sortedAppointments.map(app => {
            const dateObj = new Date(app.date);
            const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
            const day = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
            
            return (
              <div key={app.id} className="glass-panel appointment-card">
                <div className="appointment-date-badge">
                  <div className="badge-month">{month}</div>
                  <div className="badge-day">{day}</div>
                  <div className="badge-time">{app.time}</div>
                </div>
                
                <div className="appointment-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="doctor-info-sm">
                      <img src={app.doctorImage} alt={app.doctorName} className="doc-img-sm" />
                      <div>
                        <div className="doc-name-sm">{app.doctorName}</div>
                        <div className="doc-spec-sm">{app.doctorSpecialty}</div>
                      </div>
                    </div>
                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="patient-details">
                    <p><strong>Patient:</strong> {app.patientDetail.name} ({app.patientDetail.phone})</p>
                    <p><strong>Complaint:</strong> {app.patientDetail.complaint}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <p>You have no appointments yet.</p>
        </div>
      )}
    </div>
  );
};
