import React, { useState } from 'react';
import { Package, CheckCircle, Clock, Truck } from 'lucide-react';
import './EquipmentTracker.css';

const initialEquipment = [
  { id: 1, qty: 3, delivered: 1, name: "Computador Pared con Lector", desc: "Metal 11.6 inch Price Scanner Machine Windows con Wifi" },
  { id: 2, qty: 3, delivered: 1, name: "Soporte para pared", desc: "Soporte Para Tv de 32 Pulgadas Movible Ajustable Negro" },
  { id: 3, qty: 3, delivered: 1, name: "Mini Torres HP PC By Scarpian AI", desc: "HP Tyni PC - i5 6th - SSD 256 ( Scarpian Custom )" },
  { id: 4, qty: 4, delivered: 2, name: "Impresora Termica", desc: "STARPOS IF4" },
  { id: 5, qty: 3, delivered: 1, name: "Impresora Facturas", desc: "STAR TP80NC-M USB+LAN NEGRA" },
  { id: 6, qty: 9, delivered: 3, name: "Lector QR Cableados", desc: "2d/1d Con Base, Usb Digitalpos Dig-d40 Color Negro" },
  { id: 7, qty: 3, delivered: 1, name: "Estabilizador UPS", desc: "UPS Starpos 240W" },
  { id: 8, qty: 3, delivered: 0, name: "Lector Inalambrico", desc: "Dig-d40rb Inalámbrico 2d Qr Bluetooth" },
  { id: 9, qty: 1, delivered: 0, name: "Tablet Omar", desc: "Lenovo Tab 11 con Teclado y Pen" },
  { id: 10, qty: 1, delivered: 0, name: "Tablet Luis K", desc: "Lenovo Tab 11 con Teclado y Pen" },
  { id: 11, qty: 3, delivered: 0, name: "Tablet Otra", desc: "Samsung A9 - By Scarpian AI" },
  { id: 12, qty: 3, delivered: 2, name: "Teclados", desc: "Genericos" },
  { id: 13, qty: 3, delivered: 2, name: "Mouse", desc: "Genericos" },
  { id: 14, qty: 60, delivered: 60, name: "Cable UTP Ethernet Cat 6 (Metro)", desc: "Clase 6 Alta Velocidad" },
  { id: 15, qty: 30, delivered: 4, name: "Canaletas", desc: "Plastico" },
  { id: 16, qty: 1, delivered: 0, name: "Otros", desc: "Cables, Cobertores, Amarres, extensiones." },
  { id: 17, qty: 1, delivered: 1, name: "Cable 3M Extension USB", desc: "Extensión USB" },
  { id: 18, qty: 2, delivered: 2, name: "Rollos Papel Sticker 10 x 15", desc: "Suministros" },
  { id: 19, qty: 2, delivered: 2, name: "Rollos Papel Carbon", desc: "Suministros" }
];

const EquipmentTracker: React.FC = () => {
  const [equipment] = useState(initialEquipment);

  const totalItems = equipment.reduce((acc, item) => acc + item.qty, 0);
  const totalDelivered = equipment.reduce((acc, item) => acc + item.delivered, 0);
  const progressPercent = Math.round((totalDelivered / totalItems) * 100) || 0;

  return (
    <div className="equipment-tracker-wrapper">
      <div className="equipment-tracker-header">
        <div className="header-title">
          <Package className="header-icon" size={28} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Inventario de Equipos (Hardware)</h2>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px', fontWeight: 500 }}>Ya comprados y almacenados en bodega Scarpian Bogotá</span>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-label">Progreso de Entrega</span>
            <div className="global-progress-bar">
              <div className="global-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <span className="stat-value">{progressPercent}%</span>
          </div>
        </div>
      </div>

      <div className="equipment-table-container">
        <table className="equipment-table">
          <thead>
            <tr>
              <th>Equipo / Dispositivo</th>
              <th>Descripción Técnica</th>
              <th className="center-col">Total</th>
              <th className="center-col">Estado</th>
              <th className="center-col">Control de Entrega</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map(item => {
              const isComplete = item.delivered === item.qty;
              const isPartial = item.delivered > 0 && item.delivered < item.qty;

              return (
                <tr key={item.id} className={isComplete ? 'row-complete' : ''}>
                  <td className="col-name">
                    <strong>{item.name}</strong>
                  </td>
                  <td className="col-desc">{item.desc}</td>
                  <td className="center-col">
                    <div className="qty-badge">{item.qty}</div>
                  </td>
                  <td className="center-col">
                    {isComplete ? (
                      <span className="status-badge success"><CheckCircle size={14} /> Entregado</span>
                    ) : isPartial ? (
                      <span className="status-badge warning"><Truck size={14} /> Parcial</span>
                    ) : (
                      <span className="status-badge pending"><Package size={14} /> En Bodega</span>
                    )}
                  </td>
                  <td className="center-col">
                    <div className="delivery-control">
                      <span className="delivery-count">{item.delivered} / {item.qty}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentTracker;
