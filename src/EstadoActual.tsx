import React from 'react';
import MasterGantt from './MasterGantt';
import EquipmentDeliveryMatrix from './EquipmentDeliveryMatrix';
import CalendarCarousel from './CalendarCarousel';
import SiigoTrackingDashboard from './SiigoTrackingDashboard';

export default function EstadoActual() {
  return (
    <div style={{ paddingBottom: '40px' }}>
      <section className="intro">
        <h2>Resumen del Proyecto</h2>
        <p>
          Este panel evalúa el estado real del desarrollo del sistema <strong>Procoquinal OS</strong>. 
          A continuación, comparamos lo que se prometió en las etapas iniciales de la cotización 
          frente al avance real en código, midiendo la brecha ("gap") entre la Interfaz construida y el Backend restante.
        </p>
      </section>

      <div className="full-width-section">
        <CalendarCarousel />
      </div>

      <div className="full-width-section" style={{ padding: '10px 20px' }}>
        <SiigoTrackingDashboard />
      </div>

      <div className="full-width-section" style={{ backgroundColor: '#ffffff', padding: '1px 0 40px 0' }}>
        <EquipmentDeliveryMatrix />
      </div>

      <div className="full-width-section" style={{ padding: '40px 0' }}>
        <MasterGantt 
        title="Cronograma Maestro" 
        subtitle="Desarrollo real, hitos logísticos, Instalación y facturación." 
      />
      </div>
    </div>
  );
}
