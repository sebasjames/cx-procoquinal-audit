import React, { useState } from 'react';
import { Package, ChevronDown, ChevronRight } from 'lucide-react';
import './EquipmentTracker.css';

const equipmentData = [
  { id: 1, qty: 3, principal: 1, gaitan: 0, barranquilla: 0, name: "Computador Pared con Lector", desc: "Metal 11.6 inch Price Scanner Machine Windows con Wifi" },
  { id: 2, qty: 3, principal: 1, gaitan: 0, barranquilla: 0, name: "Soporte para pared", desc: "Soporte Para Tv de 32 Pulgadas Movible Ajustable Negro" },
  { id: 3, qty: 3, principal: 1, gaitan: 0, barranquilla: 0, name: "Mini Torres HP PC", desc: "HP Tyni PC - i5 6th - SSD 256 ( Scarpian Custom )" },
  { id: 4, qty: 4, principal: 2, gaitan: 0, barranquilla: 0, name: "Impresora Termica", desc: "STARPOS IF4" },
  { id: 5, qty: 3, principal: 1, gaitan: 0, barranquilla: 0, name: "Impresora Facturas", desc: "STAR TP80NC-M USB+LAN NEGRA" },
  { id: 6, qty: 9, principal: 3, gaitan: 0, barranquilla: 0, name: "Lector QR Cableados", desc: "2d/1d Con Base, Usb Digitalpos Dig-d40 Color Negro" },
  { id: 7, qty: 3, principal: 1, gaitan: 0, barranquilla: 0, name: "Estabilizador UPS", desc: "UPS Starpos 240W" },
  { id: 8, qty: 3, principal: 0, gaitan: 0, barranquilla: 0, name: "Lector Inalambrico", desc: "Dig-d40rb Inalámbrico 2d Qr Bluetooth" },
  { id: 9, qty: 1, principal: 0, gaitan: 0, barranquilla: 0, name: "Tablet Omar", desc: "Lenovo Tab 11 con Teclado y Pen" },
  { id: 10, qty: 1, principal: 0, gaitan: 0, barranquilla: 0, name: "Tablet Luis K", desc: "Lenovo Tab 11 con Teclado y Pen" },
  { id: 11, qty: 3, principal: 0, gaitan: 0, barranquilla: 0, name: "Tablet Otra", desc: "Samsung A9 - By Scarpian AI" },
  { id: 12, qty: 3, principal: 2, gaitan: 0, barranquilla: 0, name: "Teclados", desc: "Genericos" },
  { id: 13, qty: 3, principal: 2, gaitan: 0, barranquilla: 0, name: "Mouse", desc: "Genericos" },
  { id: 14, qty: 60, principal: 60, gaitan: 0, barranquilla: 0, name: "Cable UTP Ethernet Cat 6 (Metro)", desc: "Clase 6 Alta Velocidad" },
  { id: 15, qty: 30, principal: 4, gaitan: 0, barranquilla: 0, name: "Canaletas", desc: "Plastico" },
  { id: 16, qty: 1, principal: 0, gaitan: 0, barranquilla: 0, name: "Otros", desc: "Cables, Cobertores, Amarres, extensiones." },
  { id: 17, qty: 1, principal: 1, gaitan: 0, barranquilla: 0, name: "Cable 3M Extension USB", desc: "Extensión USB" },
  { id: 18, qty: 2, principal: 2, gaitan: 0, barranquilla: 0, name: "Rollos Papel Sticker 10 x 15", desc: "Suministros" },
  { id: 19, qty: 2, principal: 2, gaitan: 0, barranquilla: 0, name: "Rollos Papel Carbon", desc: "Suministros" }
];

const EquipmentDeliveryMatrix: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="equipment-tracker-wrapper" style={{ maxWidth: '950px', margin: '0 auto' }}>
      <div className="equipment-tracker-header">
        <div className="header-title">
          <Package className="header-icon" size={28} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Entrega de equipos</h2>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px', fontWeight: 500 }}>
              Matriz de distribución por sede (Hardware ya comprado)
            </span>
          </div>
        </div>
      </div>

      <div className="equipment-table-container">
        <table className="equipment-table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Equipo / Dispositivo</th>
              <th className="center-col" style={{ width: '15%' }}>Total</th>
              <th className="center-col" style={{ color: '#2563eb', width: '15%' }}>Sede Principal</th>
              <th className="center-col" style={{ color: '#16a34a', width: '15%' }}>Sede Gaitán</th>
              <th className="center-col" style={{ color: '#d97706', width: '15%' }}>Sede Barranquilla</th>
            </tr>
          </thead>
          <tbody>
            {equipmentData.map(item => (
              <React.Fragment key={item.id}>
                <tr 
                  onClick={() => toggleRow(item.id)}
                  style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  <td className="col-name">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {expandedId === item.id ? <ChevronDown size={18} color="#64748b" /> : <ChevronRight size={18} color="#64748b" />}
                    <strong>{item.name}</strong>
                    </div>
                  </td>
                  <td className="center-col">
                    <div className="qty-badge">{item.principal + item.gaitan + item.barranquilla}</div>
                  </td>
                  <td className="center-col">
                    <div style={{ fontWeight: 'bold', color: item.principal > 0 ? '#2563eb' : '#cbd5e1' }}>
                      {item.principal > 0 ? item.principal : '-'}
                    </div>
                  </td>
                  <td className="center-col">
                    <div style={{ fontWeight: 'bold', color: item.gaitan > 0 ? '#16a34a' : '#cbd5e1' }}>
                      {item.gaitan > 0 ? item.gaitan : '-'}
                    </div>
                  </td>
                  <td className="center-col">
                    <div style={{ fontWeight: 'bold', color: item.barranquilla > 0 ? '#d97706' : '#cbd5e1' }}>
                      {item.barranquilla > 0 ? item.barranquilla : '-'}
                    </div>
                  </td>
                </tr>
                {expandedId === item.id && (
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td colSpan={5} style={{ padding: '12px 16px 12px 42px', color: '#475569', fontSize: '0.9rem', borderTop: 'none', borderBottom: '1px solid #e2e8f0' }}>
                      <strong>Descripción: </strong> {item.desc}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentDeliveryMatrix;
