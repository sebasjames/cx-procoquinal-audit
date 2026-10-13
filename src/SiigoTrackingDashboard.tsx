import React, { useState, useEffect } from 'react';
import { Activity, Clock, User, Link as LinkIcon, Trash2, ShieldCheck } from 'lucide-react';

export default function SiigoTrackingDashboard() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const loadLogs = () => {
      const rawLogs = localStorage.getItem('siigo_clicks_log');
      if (rawLogs) {
        setLogs(JSON.parse(rawLogs).reverse()); // newest first
      } else {
        setLogs([]);
      }
    };
    loadLogs();
    
    // Listen for storage changes in case they click links in another tab
    window.addEventListener('storage', loadLogs);
    return () => window.removeEventListener('storage', loadLogs);
  }, []);

  const clearLogs = () => {
    if (confirm('¿Estás seguro de limpiar todo el registro de auditoría de capacitación?')) {
      localStorage.removeItem('siigo_clicks_log');
      setLogs([]);
    }
  };

  return (
    <div style={{ padding: '24px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', margin: '20px auto', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="#3b82f6" />
            Dashboard de Capacitación SIIGO
          </h3>
          <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
            Auditoría en tiempo real de los módulos y webinars consultados por el personal de contabilidad/bodega.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600, background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>Acceso:</span>
            <span style={{ fontSize: '0.9rem', color: '#2563eb', fontWeight: 600 }}>
              Disponible en la pestaña "Capacitación SIIGO" del menú superior.
            </span>
          </div>
        </div>
        <button onClick={clearLogs} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}>
          <Trash2 size={16} /> Limpiar Registros
        </button>
      </div>

      {logs.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94a3b8' }}>
          <Activity size={48} style={{ opacity: 0.2, margin: '0 auto 16px auto' }} />
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#64748b' }}>Sin actividad registrada</h4>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Los registros aparecerán aquí cuando el personal ingrese al portal y abra los manuales.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 20px', borderBottom: '2px solid #e2e8f0' }}>Fecha y Hora</th>
                <th style={{ padding: '14px 20px', borderBottom: '2px solid #e2e8f0' }}>Auditoría de Usuario</th>
                <th style={{ padding: '14px 20px', borderBottom: '2px solid #e2e8f0' }}>Módulo o Enlace Consultado</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '16px 20px', fontSize: '0.9rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} color="#94a3b8" />
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
                      <User size={14} color="#64748b" /> {log.userName}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', paddingLeft: '20px', marginTop: '4px' }}>{log.userEmail}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <a href={log.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
                      <LinkIcon size={14} style={{ marginTop: '2px', flexShrink: 0, color: '#93c5fd' }} />
                      {log.clickedItem}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
