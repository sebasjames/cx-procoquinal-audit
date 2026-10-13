import React, { useState } from 'react';
import SiigoAgenda from './SiigoAgenda';

export default function SiigoPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('siigo_portal_auth') === 'true'
  );
  const [name, setName] = useState(localStorage.getItem('siigo_user_name') || '');
  const [email, setEmail] = useState(localStorage.getItem('siigo_user_email') || '');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Contabilidad_2028!') {
      localStorage.setItem('siigo_portal_auth', 'true');
      localStorage.setItem('siigo_user_name', name.trim());
      localStorage.setItem('siigo_user_email', email.trim());
      setIsAuthenticated(true);
    } else {
      alert('Clave de acceso incorrecta.');
    }
  };

  if (isAuthenticated) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '40px' }}>
        <div style={{ background: '#ffffff', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Procoquinal - Módulo SIIGO</h1>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.85rem' }}>Sesión activa de: {name}</p>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('siigo_portal_auth');
                setIsAuthenticated(false);
              }}
              style={{ padding: '8px 16px', background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        <SiigoAgenda />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc', padding: '1rem' }}>
      <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <img src={`${import.meta.env.BASE_URL}logos/Scarpian%20Logo.webp`} alt="Scarpian AI" style={{ height: '35px', objectFit: 'contain' }} />
        </div>
        <h2 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.4rem' }}>Portal de Capacitación</h2>
        <p style={{ marginBottom: '2rem', color: '#64748b', fontSize: '0.9rem' }}>Módulo SIIGO Nube - Equipo Contable</p>
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontSize: '0.85rem', fontWeight: 600 }}>Nombre Completo</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="Ej: Lizeth García" />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontSize: '0.85rem', fontWeight: 600 }}>Correo Electrónico</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="ejemplo@procoquinal.com" />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontSize: '0.85rem', fontWeight: 600 }}>Clave de Acceso</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} placeholder="Contraseña asignada" />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
            Ingresar a los módulos
          </button>
        </form>
      </div>
    </div>
  );
}
