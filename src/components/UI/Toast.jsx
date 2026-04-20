import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import './Toast.css';

export const Toast = () => {
  const { toast } = useAppContext();

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type}`}>
        {toast.type === 'success' ? (
          <CheckCircle style={{ color: '#0d9488' }} size={20} />
        ) : (
          <AlertCircle style={{ color: '#ef4444' }} size={20} />
        )}
        <span style={{ fontWeight: 500, color: '#0f172a' }}>{toast.message}</span>
      </div>
    </div>
  );
};
