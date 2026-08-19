import React from 'react';
import { DollarSign, Flag, Clock, FileSearch } from 'lucide-react';
import './BillingTimeline.css';

const billingEvents = [
  { id: 1, x: 10,  position: 'top',    date: "13 de Marzo", title: "Pago Inicial A", amount: 1600, currency: "USD", type: "start", description: "Firma de acuerdo e inicio." },
  { id: 2, x: 10,  position: 'bottom', date: "13 de Marzo", title: "Pago Inicial B", amount: 5400, currency: "USD", type: "payment", description: "Complemento del inicio." },
  { id: 3, x: 34.5, position: 'top',   date: "5 de Mayo",   title: "Pago 2 - A",     amount: 5565, currency: "USD", type: "payment", description: "Primer pago de etapa 2." },
  { id: 4, x: 35.5, position: 'bottom',date: "7 de Mayo",   title: "Pago 2 - B",     amount: 2385, currency: "USD", type: "payment", description: "Complemento segundo pago." },
  { id: 5, x: 45.1, position: 'top',   date: "28 de Mayo",  title: "Tercer Pago A",  amount: 5000, currency: "USD", type: "payment", description: "Primer abono del tercer ciclo." },
  { id: 6, x: 61.7, position: 'bottom', date: "3 de Julio",  title: "Tercer Pago B",  amount: 3930, currency: "USD", type: "remainder", description: "Liquidación ($3,450 + $480)." },
  { id: 7, x: 66.3, position: 'top',   date: "13 de Julio", title: "Facturación Julio", amount: 18881100, currency: "COP", type: "payment", description: "Pagado 19 Agosto" },
  { id: 8, x: 80.6, position: 'bottom', date: "13 de Agosto", title: "Facturación Agosto", amount: 22027950, currency: "COP", type: "pending", description: "Próximo a vencimiento." },
  { id: 9, x: 83,  position: 'top',    date: "14 de Agosto", title: "AUDITORÍA", amount: null, currency: "", type: "audit", description: "Informe detallado integral." },
  { id: 10, x: 95, position: 'bottom', date: "13 de Sept",  title: "Entrega Final", amount: 22027950, currency: "COP", type: "pending", description: "Cierre de la Etapa 2." }
];

const getIcon = (type: string) => {
  if (type === 'start') return <Flag size={20} />;
  if (type === 'pending') return <Clock size={20} />;
  if (type === 'audit') return <FileSearch size={20} />;
  return <DollarSign size={20} />;
};

const getColorClass = (type: string) => {
  if (type === 'start') return 'node-start';
  if (type === 'pending') return 'node-pending';
  if (type === 'remainder') return 'node-remainder';
  if (type === 'audit') return 'node-audit';
  return 'node-payment';
};

const formatCurrency = (amount: number | null, currency: string) => {
  if (amount === null) return "DOCUMENTO OFICIAL";
  if (currency === 'COP') return `COP $${amount.toLocaleString()}`;
  return `USD $${amount.toLocaleString()}`;
};

const BillingTimeline: React.FC = () => {
  const totalPaidUSD = billingEvents
    .filter(e => e.type !== 'pending' && e.type !== 'audit' && e.currency === 'USD')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const totalPaidCOP = billingEvents
    .filter(e => e.type !== 'pending' && e.type !== 'audit' && e.currency === 'COP')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <section className="billing-timeline-wrapper">
      <div className="billing-header">
        <h2>Flujo de Caja y Facturación</h2>
        <p>Línea de tiempo proporcional de hitos financieros (Total Recaudado: USD ${totalPaidUSD.toLocaleString()} {totalPaidCOP > 0 ? `+ COP $${totalPaidCOP.toLocaleString()}` : ''})</p>
      </div>

      <div className="proportional-gantt-container">
        
        {/* Background SVG Layer for Wave and Arrows */}
        <svg className="gantt-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main Axis Baseline */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />

          {/* Connection Arrows between A and B payments */}
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#3b82f6" />
            </marker>
          </defs>

          {/* 13 March Arrow (A -> B) */}
          <line x1="10" y1="40" x2="10" y2="60" stroke="#3b82f6" strokeWidth="0.4" strokeDasharray="1 0.5" markerEnd="url(#arrowhead)" />
          
          {/* May Arrow (5 May -> 7 May) */}
          <line x1="34.5" y1="40" x2="35.5" y2="60" stroke="#3b82f6" strokeWidth="0.4" strokeDasharray="1 0.5" markerEnd="url(#arrowhead)" />
          
          {/* May -> July Arrow (28 May -> 3 July) */}
          <path 
            d="M 45.1 40 C 50 50, 55 50, 61.7 60" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="0.4" 
            strokeDasharray="1 0.5" 
            markerEnd="url(#arrowhead)" 
          />
        </svg>

        {/* HTML Nodes overlay */}
        <div className="gantt-nodes-layer">
          {billingEvents.map((event) => (
            <div 
              key={event.id} 
              className={`gantt-node-absolute ${getColorClass(event.type)} ${event.position}`}
              style={{ left: `${event.x}%` }}
            >
              {/* The circle on the axis */}
              <div className="gantt-node-point">
                {getIcon(event.type)}
              </div>

              {/* The info card */}
              <div className="gantt-node-card">
                <div className="gantt-card-date">{event.date}</div>
                <h4 className="gantt-card-title">{event.title}</h4>
                <div className="gantt-card-amount">{formatCurrency(event.amount, event.currency)}</div>
                <p className="gantt-card-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="billing-footer-note">
        <strong>Contexto de Acumulación:</strong> El abono correspondiente a finales de mayo fue fraccionado, concretándose su remanente apenas el 3 de julio. Esto generó un estrecho solapamiento temporal con la facturación programada para el 13 de julio. Como concesión de liquidez para el cliente, dicho cobro se aplazó, resultando en la acumulación actual del saldo de julio junto con los honorarios venideros del 13 de agosto.
      </div>

      {/* Traditional Ledger Table */}
      <div className="billing-table-container">
        <h3 className="billing-table-title">Estado de Cuenta (Ledger)</h3>
        <div className="table-wrapper">
          <table className="billing-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>Est.</th>
                <th>Fecha</th>
                <th>Concepto / Hito</th>
                <th className="text-right">Monto</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {billingEvents.map((event) => (
                <tr key={event.id} className={`row-type-${event.type}`}>
                  <td className="text-center">
                    <span className={`status-dot dot-${event.type}`} title={event.type}></span>
                  </td>
                  <td className="table-date">{event.date}</td>
                  <td className="table-title">{event.title}</td>
                  <td className="text-right table-amount">
                    {event.amount === null ? <span className="empty-amount">-</span> : formatCurrency(event.amount, event.currency)}
                  </td>
                  <td className="table-desc">{event.description}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right footer-label">Total Recaudado (Pagado):</td>
                <td className="text-right footer-value success-value">
                  USD ${totalPaidUSD.toLocaleString()}
                  {totalPaidCOP > 0 && <><br/>+ COP ${totalPaidCOP.toLocaleString()}</>}
                </td>
                <td className="footer-label">≈ COP $86,913,000 (Liquidado USD)</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right footer-label">Total Pendiente (Proyectado):</td>
                <td className="text-right footer-value pending-value">COP ${(
                  billingEvents
                    .filter(e => e.type === 'pending' && e.currency === 'COP')
                    .reduce((acc, curr) => acc + (curr.amount || 0), 0)
                ).toLocaleString()}</td>
                <td></td>
              </tr>
              <tr style={{ borderTop: '2px solid #e2e8f0' }}>
                <td colSpan={3} className="text-right footer-label" style={{ fontWeight: 800, color: '#0f172a' }}>Valor Total del Proyecto:</td>
                <td className="text-right footer-value" style={{ fontWeight: 800, color: '#0f172a' }}>COP $149,850,000</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BillingTimeline;
