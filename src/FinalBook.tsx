import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { Maximize2, Minimize2 } from 'lucide-react';
import './FinalBook.css';

interface PageProps {
  children: React.ReactNode;
  number?: number;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="book-page" ref={ref}>
      <div className="page-content">
        {props.children}
        {props.number && <div className="page-footer">Página {props.number}</div>}
      </div>
    </div>
  );
});

const FinalBook: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bookRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      if (bookRef.current) {
        await bookRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <section ref={bookRef} className={`final-book-wrapper ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="book-header">
        <div className="book-header-text">
          <h2>Documentación y Anexos</h2>
          <p>Haz clic en las esquinas de las hojas o arrástralas para pasar la página.</p>
        </div>
        <button 
          className="fullscreen-book-btn" 
          onClick={toggleFullscreen}
          title="Pantalla Completa"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          {isFullscreen ? " Salir" : " Pantalla Completa (F11)"}
        </button>
      </div>
      
      <div className="book-container">
        {/* @ts-ignore */}
        <HTMLFlipBook 
          width={500} 
          height={700} 
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="flip-book-element"
        >
          {/* Cover */}
          <Page>
            <div className="cover-page">
              <div className="cover-content">
                <h1>Avalon OS</h1>
                <h2>Auditoría y Reporte Estratégico Detallado</h2>
                <div className="divider"></div>
                <p>Confidencial - Management Brief</p>
                <p style={{marginTop: '40px', fontSize: '10px', opacity: 0.6}}>Preparado por: Avalon Consulting Group<br/>Agosto 2026</p>
              </div>
            </div>
          </Page>
          
          {/* Page 1 */}
          <Page number={1}>
            <div className="report-page-content">
              <h2>1. RESUMEN EJECUTIVO PROFUNDO (Parte 1)</h2>
              <p>Este informe técnico-estratégico documenta el proceso de transformación digital más ambicioso en la historia de <strong>Procoquinal</strong>, liderado por la firma tecnológica <strong>Scarpian AI</strong>. El despliegue de <strong>Avalon OS</strong> no es simplemente la instalación de un software ERP; representa una reingeniería completa de los flujos de información, la arquitectura de datos y la capacidad de toma de decisiones de la compañía.</p>
              <p>Durante un sprint intensivo de desarrollo (Marzo - Agosto 2026), Scarpian AI ha logrado consolidar una infraestructura que absorbe las ineficiencias del sistema legado, inyectando un núcleo operativo inmutable (System 1.0) y una capa cognitiva de Inteligencia Artificial (System 2.0).</p>
            </div>
          </Page>

          {/* Page 2 */}
          <Page number={2}>
            <div className="report-page-content">
              <h2>1. RESUMEN EJECUTIVO PROFUNDO (Parte 2)</h2>
              <p>A pesar de fricciones críticas ajenas al desarrollo de software puro—tales como la caída catastrófica de los servidores físicos legados de Procoquinal en Mayo, o los rígidos bloqueos regulatorios impuestos por la API externa de SIIGO—el proyecto mantiene una salud estructural envidiable.</p>
              <p>La Etapa 1 se encuentra al 90% de su completitud, mientras que la Etapa 2 (IA), adelantada por urgencia operativa, reporta un robusto 85%.</p>
              <p>Este documento expone con rigor forense el estado financiero de la inversión (COP $149M), los cuellos de botella tecnológicos superados y el estricto protocolo militar de "Go-Live" que regirá los próximos 32 días (hasta el 15 de Septiembre).</p>
            </div>
          </Page>

          {/* Page 3 */}
          <Page number={3}>
            <div className="report-page-content">
              <h2>2. EL DOLOR OPERATIVO (AS-IS)</h2>
              <p>Previo a la intervención de Avalon OS, la auditoría reveló que Procoquinal sufría de "ceguera operativa inducida por silos". La compañía operaba sobre cimientos tecnológicos inestables:</p>
              <ul className="report-list">
                <li><strong>Latencias Críticas de Sincronización:</strong> El inventario físico de las bodegas en Centenario, Gaitán y Barranquilla no compartía un "Single Source of Truth". Esto generaba ventas fantasma.</li>
                <li><strong>Ausencia de Lógica ATP (Available To Promise):</strong> Al no calcular el inventario en tránsito, el equipo comercial prometía entregas imposibles.</li>
                <li><strong>Fractura Contable-Operativa:</strong> El POS operaba divorciado de la causación central. Conciliaciones manuales lentas.</li>
                <li><strong>Pronósticos Basados en Heurística:</strong> Decisiones de compras sin modelado estadístico (quiebres de stock).</li>
              </ul>
              <div className="alert-box warning">
                <strong>Vulnerabilidad Estructural:</strong> La dependencia de hardware local On-Premise ponía en riesgo la continuidad del negocio ante fallas eléctricas.
              </div>
            </div>
          </Page>

          {/* Page 4 */}
          <Page number={4}>
            <div className="report-page-content">
              <h2>3. AUDITORÍA DE INGENIERÍA: ETAPA 1</h2>
              <p>El "Cerebro Operativo" (System 1.0) es el motor de alta concurrencia que Scarpian AI construyó bajo arquitectura Serverless (99.99% Uptime).</p>
              
              <h3>Desglose de Módulos (Cerebro Operativo)</h3>
              <table className="report-table">
                <thead><tr><th>Componente Core</th><th>Avance</th><th>Detalle Técnico</th></tr></thead>
                <tbody>
                  <tr><td>Inventario Maestro</td><td>100%</td><td>Algoritmo de valorización FIFO implementado.</td></tr>
                  <tr><td>Producción / Lotes</td><td>100%</td><td>Trazabilidad de lotes y ensamblaje de kits.</td></tr>
                  <tr><td>Motor ATP</td><td>100%</td><td>Bloqueo matemático de stock comprometido.</td></tr>
                  <tr><td>UI POS B2B</td><td>100%</td><td>Baja latencia para escáneres 2D sin recargas.</td></tr>
                  <tr><td>Event Log DB</td><td>100%</td><td>Registro inmutable de mutaciones de datos.</td></tr>
                  <tr><td><strong>Adaptador DIAN</strong></td><td><strong>10%</strong></td><td><strong>Cuello de botella activo: API de SIIGO.</strong></td></tr>
                </tbody>
              </table>
            </div>
          </Page>

          {/* Page 5 */}
          <Page number={5}>
            <div className="report-page-content">
              <h2>3. AUDITORÍA DE INGENIERÍA (Continuación)</h2>
              
              <h3>El Bloqueador Técnico (SIIGO)</h3>
              <p>La ingeniería de Scarpian superó rápidamente las metas de la Etapa 1. Sin embargo, al conectar el módulo de facturación (Adaptador DIAN) con el sistema SIIGO, se descubrió una grave limitación estructural.</p>
              <p>La API de SIIGO no soporta la alta velocidad de transmisión de datos transaccionales que genera Avalon OS en momentos de alto tráfico B2B.</p>
              
              <div className="alert-box warning">
                <strong>Solución Implementada (Queue Broker):</strong> Esto ha obligado a los ingenieros a construir un complejo sistema de "Encolamiento de Mensajes" interno para inyectar las facturas lentamente, una a una, y evitar así que los servidores de SIIGO rechacen las transacciones bajo las reglas de "Rate Limiting".
              </div>
            </div>
          </Page>

          {/* Page 6 */}
          <Page number={6}>
            <div className="report-page-content">
              <h2>4. AUDITORÍA DE INGENIERÍA: ETAPA 2</h2>
              <p>El "System 2.0" (Inteligencia & Decisión) se adelantó para solventar la parálisis analítica heredada.</p>

              <h3>Desglose de Módulos Cognitivos</h3>
              <table className="report-table">
                <thead><tr><th>Componente AI</th><th>Avance</th><th>Detalle Técnico</th></tr></thead>
                <tbody>
                  <tr><td>Forecast de Demanda</td><td>100%</td><td>Predicción de ventas futuras mediante IA.</td></tr>
                  <tr><td>Purchasing Intel.</td><td>100%</td><td>Alertas cruzadas con Lead-Times.</td></tr>
                  <tr><td>Impacto Financiero</td><td>100%</td><td>Cálculo de capital inmovilizado.</td></tr>
                  <tr><td>Gemini LLM Copilot</td><td>100%</td><td>Chatbot NLP con contexto contable.</td></tr>
                  <tr><td><strong>Decision Memory</strong></td><td><strong>15%</strong></td><td><strong>En construcción: BD Vectorial.</strong></td></tr>
                </tbody>
              </table>

              <p><strong>Valor Inyectado:</strong> Este pivote ágil proveyó herramientas tempranas como el Asistente ETL para limpiar el catálogo maestro y predecir la rotación de inventario con semanas de anticipación.</p>
            </div>
          </Page>

          {/* Page 7 */}
          <Page number={7}>
            <div className="report-page-content">
              <h2>5. FORENSE FINANCIERO Y FLUJO DE CAJA</h2>
              <p>El desarrollo de un ERP personalizado requiere un flujo de caja (Cash Flow) impecable para mantener la densidad de ingeniería al máximo. La auditoría revela tensiones críticas.</p>

              <h3>Liquidación del Presupuesto (CAPEX)</h3>
              <ul className="report-list">
                <li><strong>Presupuesto Total Aprobado:</strong> COP $149,850,000</li>
                <li><strong>Inversión Materializada a la Fecha:</strong> USD $23,880 (Aprox. COP $86,913,000 liquidados).</li>
                <li><strong>Saldo Pendiente a Cobrar:</strong> COP $62,937,000.</li>
              </ul>
              
              <div className="alert-box danger">
                <strong>Análisis del Cash Flow Gap (Brecha de Liquidez):</strong> El "Tercer Pago" proyectado para Mayo sufrió un fraccionamiento no planificado. El desembolso de la Parte A ocurrió el 28 de Mayo, pero la Parte B se retrasó hasta el 3 de Julio (35 días de brecha operativa en déficit).
              </div>
              <p>Existen facturas acumuladas (Julio y Agosto) que requieren saneamiento inmediato previo a la entrega final.</p>
            </div>
          </Page>

          {/* Page 8 */}
          <Page number={8}>
            <div className="report-page-content">
              <h2>6. BITÁCORA DE INCIDENCIAS OPERATIVAS (Parte 1)</h2>
              <p>La línea de tiempo de Avalon OS fue moldeada por fricciones con el mundo físico y los procesos corporativos heredados:</p>
              
              <ul className="report-list">
                <li><strong>Mayo 6 - Colapso de Infraestructura Local:</strong> Los servidores físicos de Procoquinal sufrieron una caída. Aunque trágico operativamente, este evento validó la visión de Scarpian: migrar a la nube Serverless era una urgencia de supervivencia corporativa, no un lujo.</li>
                <li><strong>Mayo 14 y Julio 11 - El Desfase Contable (SIIGO):</strong> El punto de mayor fricción. Se identificó que los flujos propuestos chocaban con rigideces fiscales exigidas por contabilidad. Se requirió cirugía mayor en el flujo de datos para alinear la velocidad de Avalon con la burocracia contable preexistente.</li>
              </ul>
            </div>
          </Page>

          {/* Page 9 */}
          <Page number={9}>
            <div className="report-page-content">
              <h2>6. BITÁCORA DE INCIDENCIAS OPERATIVAS (Parte 2)</h2>
              
              <ul className="report-list">
                <li><strong>Junio 2 - Complejidad de Ensamblaje:</strong> Se detectó tempranamente que el manejo de "Kits" comerciales y ensamblajes requería una lógica de de-construcción de inventario mucho más profunda de lo cotizado originalmente en el Módulo de Producción y Lotes.</li>
                <li><strong>Julio 2 - Falla de Hardware (Lectura Óptica):</strong> Los escáneres 2D inalámbricos adquiridos presentaron interferencias y lentitud grave al intentar leer códigos de barras de alta densidad en el entorno físico, forzando un re-mapeo del hardware in-situ por parte de los ingenieros.</li>
              </ul>
            </div>
          </Page>

          {/* Page 10 */}
          <Page number={10}>
            <div className="report-page-content">
              <h2>7. AUDITORÍA DE INFRAESTRUCTURA (Parte 1)</h2>
              <p>El software requiere hardware de grado industrial. Se audita el inventario completo de equipos y su estado de entrega:</p>

              <table className="report-table">
                <thead><tr><th>Equipo / Dispositivo</th><th>Descripción Técnica</th><th>Total</th><th>Estado</th></tr></thead>
                <tbody>
                  <tr><td>Computador Pared con Lector</td><td>Metal 11.6 inch Price Scanner Machine Windows Wifi</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Soporte para pared</td><td>Soporte TV 32" Movible Ajustable Negro</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Mini Torres HP PC</td><td>HP Tyni PC - i5 6th - SSD 256 (By Scarpian)</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Impresora Térmica</td><td>STARPOS IF4</td><td>4</td><td>Parcial</td></tr>
                  <tr><td>Impresora Facturas</td><td>STAR TP80NC-M USB+LAN NEGRA</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Lector QR Cableados</td><td>2d/1d Con Base, Usb Digitalpos Dig-d40 Negro</td><td>9</td><td>En Bodega</td></tr>
                  <tr><td>Estabilizador UPS</td><td>UPS Starpos 240W</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Lector Inalámbrico</td><td>Dig-d40rb Inalámbrico 2d Qr Bluetooth</td><td>3</td><td>En Bodega</td></tr>
                </tbody>
              </table>
            </div>
          </Page>

          {/* Page 11 */}
          <Page number={11}>
            <div className="report-page-content">
              <h2>7. AUDITORÍA DE INFRAESTRUCTURA (Parte 2)</h2>
              
              <table className="report-table">
                <thead><tr><th>Equipo / Dispositivo</th><th>Descripción Técnica</th><th>Total</th><th>Estado</th></tr></thead>
                <tbody>
                  <tr><td>Tablet Omar</td><td>Lenovo Tab 11 con Teclado y Pen</td><td>1</td><td>En Bodega</td></tr>
                  <tr><td>Tablet Luis K</td><td>Lenovo Tab 11 con Teclado y Pen</td><td>1</td><td>En Bodega</td></tr>
                  <tr><td>Tablet Otra</td><td>Samsung A9 - By Scarpian AI</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Teclados</td><td>Genéricos</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Mouse</td><td>Genéricos</td><td>3</td><td>En Bodega</td></tr>
                  <tr><td>Cable UTP - 300 Metros</td><td>Clase 6 Alta Velocidad</td><td>1</td><td>En Bodega</td></tr>
                  <tr><td>Canaletas</td><td>Plástico</td><td>30</td><td>En Bodega</td></tr>
                  <tr><td>Otros</td><td>Cables, Cobertores, Amarres, extensiones.</td><td>1</td><td>En Bodega</td></tr>
                </tbody>
              </table>
              
              <div className="alert-box warning">
                <strong>Recomendación de Despliegue:</strong> Todo este inventario requiere un cronograma físico de instalación. Se debe garantizar que las canaletas, el cableado UTP y los soportes de pared se instalen antes de energizar los equipos para evitar daños por mala manipulación en el entorno B2B.
              </div>
            </div>
          </Page>

          {/* Page 12 */}
          <Page number={12}>
            <div className="report-page-content">
              <h2>8. ROADMAP ESTRATÉGICO: SPRINT DE CIERRE</h2>
              <p>Restan 32 días para transformar a Procoquinal definitivamente.</p>

              <h3>Fase 1: Preparación y Blindaje</h3>
              <ul className="report-list">
                <li><strong>Paso 1: Sinergia Contable SIIGO (Ago 14 - 18)</strong><br/>
                Pruebas de fuego en entorno cerrado (Sandbox). Scarpian, Contadora y SIIGO disparan facturas simuladas para cuadrar impuestos al centavo.</li>
                
                <li><strong>Paso 2: Change Management (Ago 19 - 23)</strong><br/>
                Romper la resistencia al cambio. Inmersión de 3 días para vendedores y operarios.</li>
                
                <li><strong>Paso 3: Migración Cero (Ago 24 - 29)</strong><br/>
                Conteo Físico Maestro. Se congela el mundo físico y se inyecta la data limpia en Avalon. Simulacros de alta facturación.</li>
              </ul>
            </div>
          </Page>

          {/* Page 13 */}
          <Page number={13}>
            <div className="report-page-content">
              <h3>Fase 2: El Despliegue (Go-Live)</h3>
              <p>Se aplicará una metodología de Despliegue Escalonado para aislar el "Blast Radius" de cualquier error técnico post-lanzamiento.</p>

              <ul className="report-list">
                <li><strong>Paso 4: Go-Live Escalonado (Ago 30 - Sep 8)</strong><br/>
                  - <em>Día 0 (Ago 30):</em> Encendido en Centenario.<br/>
                  - <em>Día 8 (Sep 6):</em> Expansión a Sede Gaitán.<br/>
                  - <em>Día 10 (Sep 8):</em> Expansión a Sede Barranquilla.<br/>
                </li>
                
                <li><strong>Paso 5: Hiper-Cuidado y Firma (Sep 9 - 15)</strong><br/>
                Monitoreo en tiempo real, ajuste algorítmico y firma del Acta de Entrega Final del proyecto.</li>
              </ul>
            </div>
          </Page>

          {/* Page 14 */}
          <Page number={14}>
            <div className="report-page-content">
              <h2>9. RECOMENDACIONES CONSULTIVAS FINALES</h2>
              <p>Dictámenes finales de Avalon Consulting para la Junta Directiva:</p>

              <ol className="report-list">
                <li><strong>Gobernanza de Datos (Data Hygiene):</strong> La empresa debe nombrar un "Auditor de Datos" para vigilar la higiene del catálogo de productos y prevenir contaminación en los modelos de Inteligencia Artificial.</li>
                <li><strong>Manejo de Expectativas con SIIGO:</strong> Avalon OS opera en milisegundos; SIIGO opera con latencia. El personal contable debe tolerar esta asincronía técnica externa.</li>
                <li><strong>Saneamiento Total de Cartera:</strong> Es un imperativo estratégico liquidar todo pago atrasado de inmediato para evitar distracciones en el equipo de ingeniería durante el Go-Live crítico.</li>
              </ol>
            </div>
          </Page>

          {/* Page 15 */}
          <Page number={15}>
            <div className="report-page-content verdict-page">
              <div className="verdict-container">
                <h1>VEREDICTO FINAL</h1>
                <div className="verdict-divider"></div>
                <p>
                  El proyecto goza de excelente salud técnica.<br/>
                  La arquitectura inmutable y Serverless ha mitigado exitosamente los riesgos estructurales heredados del software legacy.
                </p>
                <div className="verdict-signature">
                  <div className="signature-line"></div>
                  <strong>Procoquinal - Avalon AI</strong><br/>
                  <small>Scarpian AI Auditoría Tecnológica</small>
                </div>
              </div>
            </div>
          </Page>

          {/* Page 16 - Blank padding for even physical sheets */}
          <Page number={16}>
            <div className="report-page-content" style={{justifyContent: 'center', alignItems: 'center', opacity: 0.3}}>
              <p>Página intencionalmente en blanco</p>
            </div>
          </Page>

          {/* Back Cover */}
          <Page>
            <div className="cover-page back-cover">
              <div className="cover-content">
                <h2>Cierre del Documento</h2>
                <div className="divider"></div>
                <p>Procoquinal - Scarpian AI</p>
                <p style={{marginTop: '20px', fontSize: '12px', opacity: 0.5}}>© 2026 Reservados todos los derechos.</p>
              </div>
            </div>
          </Page>

        </HTMLFlipBook>
      </div>
    </section>
  );
};

export default FinalBook;
