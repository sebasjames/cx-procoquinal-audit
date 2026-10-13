import React, { useState } from 'react';
import { Package, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import './EquipmentTracker.css';

type EquipmentItem = {
  id: number | string;
  qty: number;
  principal: number;
  gaitan: number;
  barranquilla: number;
  name: string;
  desc: string;
  subItems?: EquipmentItem[];
};

const initialEquipmentData: EquipmentItem[] = [
  { id: 1, qty: 3, principal: 1, gaitan: 1, barranquilla: 0, name: "Computador Pared con Lector", desc: "Metal 11.6 inch Price Scanner Machine Windows con Wifi" },
  { id: 3, qty: 3, principal: 1, gaitan: 0, barranquilla: 0, name: "Mini Torres HP PC", desc: "HP Tyni PC - i5 6th - SSD 256 ( Scarpian Custom )" },
  { id: 4, qty: 4, principal: 2, gaitan: 1, barranquilla: 0, name: "Impresora Termica", desc: "STARPOS IF4" },
  { id: 5, qty: 3, principal: 1, gaitan: 1, barranquilla: 0, name: "Impresora Facturas", desc: "STAR TP80NC-M USB+LAN NEGRA" },
  { id: 6, qty: 9, principal: 3, gaitan: 1, barranquilla: 0, name: "Lector QR Cableados", desc: "2d/1d Con Base, Usb Digitalpos Dig-d40 Color Negro" },
  { id: 7, qty: 3, principal: 1, gaitan: 1, barranquilla: 0, name: "Estabilizador UPS", desc: "UPS Starpos 240W" },
  { id: 8, qty: 3, principal: 0, gaitan: 0, barranquilla: 0, name: "Lector Inalambrico", desc: "Dig-d40rb Inalámbrico 2d Qr Bluetooth" },
  { id: 9, qty: 1, principal: 0, gaitan: 0, barranquilla: 0, name: "Tablet Omar", desc: "Lenovo Tab 11 con Teclado y Pen" },
  { id: 10, qty: 1, principal: 0, gaitan: 0, barranquilla: 0, name: "Tablet Luis K", desc: "Lenovo Tab 11 con Teclado y Pen" },
  { id: 11, qty: 3, principal: 0, gaitan: 0, barranquilla: 0, name: "Tablet Otra", desc: "Samsung A9 - By Scarpian AI" },
  { id: 12, qty: 3, principal: 2, gaitan: 1, barranquilla: 0, name: "Teclados", desc: "Genericos" },
  { id: 13, qty: 3, principal: 2, gaitan: 1, barranquilla: 0, name: "Mouse", desc: "Genericos" },
  { id: 14, qty: 110, principal: 60, gaitan: 50, barranquilla: 0, name: "Cable UTP Ethernet Cat 6 (Metro)", desc: "Clase 6 Alta Velocidad" },
  { id: 15, qty: 30, principal: 8, gaitan: 10, barranquilla: 0, name: "Canaletas", desc: "Plastico" },
  { id: 16, qty: 0, principal: 0, gaitan: 0, barranquilla: 0, name: "Otros", desc: "Cosas extras (Repisas, Amarres, etc)", subItems: [
    { id: '16-1', qty: 2, principal: 1, gaitan: 1, barranquilla: 0, name: "Repisas", desc: "Soportes de madera/metal" },
    { id: '16-2', qty: 1, principal: 0, gaitan: 0, barranquilla: 0, name: "Cables, Cobertores, Amarres", desc: "Varios" }
  ] },
  { id: 17, qty: 2, principal: 1, gaitan: 1, barranquilla: 0, name: "Cable 3M Extension USB", desc: "Extensión USB" },
  { id: 18, qty: 3, principal: 2, gaitan: 1, barranquilla: 0, name: "Rollos Papel Sticker 10 x 15", desc: "Suministros" },
  { id: 19, qty: 3, principal: 2, gaitan: 1, barranquilla: 0, name: "Rollos Papel Carbon", desc: "Suministros" }
];

const EquipmentDeliveryMatrix: React.FC = () => {
  const [data, setData] = useState<EquipmentItem[]>(initialEquipmentData);
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  
  const [newSubItemName, setNewSubItemName] = useState('');
  const [newSubItemP, setNewSubItemP] = useState(0);
  const [newSubItemG, setNewSubItemG] = useState(0);
  const [newSubItemB, setNewSubItemB] = useState(0);

  const toggleRow = (id: number | string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const addSubItem = (parentId: number | string) => {
    if (!newSubItemName) return;
    setData(prev => prev.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          subItems: [...(item.subItems || []), {
            id: Date.now().toString(),
            name: newSubItemName,
            principal: newSubItemP,
            gaitan: newSubItemG,
            barranquilla: newSubItemB,
            qty: newSubItemP + newSubItemG + newSubItemB,
            desc: "Agregado manualmente"
          }]
        };
      }
      return item;
    }));
    setNewSubItemName('');
    setNewSubItemP(0);
    setNewSubItemG(0);
    setNewSubItemB(0);
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
            {data.map(item => {
              let p = item.principal;
              let g = item.gaitan;
              let b = item.barranquilla;
              if (item.subItems) {
                p = item.subItems.reduce((acc, sub) => acc + sub.principal, 0);
                g = item.subItems.reduce((acc, sub) => acc + sub.gaitan, 0);
                b = item.subItems.reduce((acc, sub) => acc + sub.barranquilla, 0);
              }
              const total = p + g + b;

              return (
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
                      <div className="qty-badge">{total}</div>
                    </td>
                    <td className="center-col">
                      <div style={{ fontWeight: 'bold', color: p > 0 ? '#2563eb' : '#cbd5e1' }}>
                        {p > 0 ? p : '-'}
                      </div>
                    </td>
                    <td className="center-col">
                      <div style={{ fontWeight: 'bold', color: g > 0 ? '#16a34a' : '#cbd5e1' }}>
                        {g > 0 ? g : '-'}
                      </div>
                    </td>
                    <td className="center-col">
                      <div style={{ fontWeight: 'bold', color: b > 0 ? '#d97706' : '#cbd5e1' }}>
                        {b > 0 ? b : '-'}
                      </div>
                    </td>
                  </tr>
                  {expandedId === item.id && (
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <td colSpan={5} style={{ padding: '16px 16px 16px 42px', borderTop: 'none', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ marginBottom: '12px', color: '#475569', fontSize: '0.9rem' }}>
                          <strong>Descripción: </strong> {item.desc}
                        </div>
                        
                        {item.subItems && (
                          <div style={{ marginTop: '16px', backgroundColor: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>Sub-productos</h4>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                              <thead>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                  <th style={{ textAlign: 'left', padding: '8px 4px', color: '#64748b' }}>Nombre</th>
                                  <th style={{ textAlign: 'center', padding: '8px 4px', color: '#2563eb' }}>Principal</th>
                                  <th style={{ textAlign: 'center', padding: '8px 4px', color: '#16a34a' }}>Gaitán</th>
                                  <th style={{ textAlign: 'center', padding: '8px 4px', color: '#d97706' }}>Barranquilla</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.subItems.map(sub => (
                                  <tr key={sub.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '8px 4px', fontWeight: 500 }}>{sub.name}</td>
                                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>{sub.principal}</td>
                                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>{sub.gaitan}</td>
                                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>{sub.barranquilla}</td>
                                  </tr>
                                ))}
                                <tr>
                                  <td style={{ padding: '12px 4px' }}>
                                    <input 
                                      type="text" 
                                      placeholder="Nuevo producto..." 
                                      value={newSubItemName}
                                      onChange={e => setNewSubItemName(e.target.value)}
                                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                    />
                                  </td>
                                  <td style={{ padding: '12px 4px', textAlign: 'center' }}>
                                    <input 
                                      type="number" 
                                      min="0"
                                      value={newSubItemP}
                                      onChange={e => setNewSubItemP(parseInt(e.target.value) || 0)}
                                      style={{ width: '50px', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'center' }}
                                    />
                                  </td>
                                  <td style={{ padding: '12px 4px', textAlign: 'center' }}>
                                    <input 
                                      type="number" 
                                      min="0"
                                      value={newSubItemG}
                                      onChange={e => setNewSubItemG(parseInt(e.target.value) || 0)}
                                      style={{ width: '50px', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'center' }}
                                    />
                                  </td>
                                  <td style={{ padding: '12px 4px', textAlign: 'center' }}>
                                    <input 
                                      type="number" 
                                      min="0"
                                      value={newSubItemB}
                                      onChange={e => setNewSubItemB(parseInt(e.target.value) || 0)}
                                      style={{ width: '50px', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'center' }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                              <button 
                                onClick={() => addSubItem(item.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '6px 12px',
                                  backgroundColor: '#0f172a',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                <Plus size={16} /> Agregar
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentDeliveryMatrix;
