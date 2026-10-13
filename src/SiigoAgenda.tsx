import React from 'react';
import { ExternalLink, BookOpen, AlertCircle, CheckCircle, Video } from 'lucide-react';

const agendaData = [
  {
    webinar: "Webinar 1",
    links: [
      { text: "Primeros pasos Premium", url: "https://us06web.zoom.us/webinar/register/WN_I2f9qj1ORByt7Z3MO40sLA#/registration" },
      { text: "Configuraciones iniciales", url: "https://zoom.us/webinar/register/WN_SuinYUy-QeONjrbjI8p91Q#/registration" }
    ],
    sections: [
      {
        subtitle: "Configuración inicial",
        items: [
          { text: "Perfilamiento" },
          { text: "Ingreso y Navegacion", url: "https://siigonube.portaldeclientes.siigo.com/ingresar-y-navegar-en-siigo-nube/" },
          { text: "Perfil de la Organización", url: "https://siigonube.portaldeclientes.siigo.com/configurar-el-perfil-de-la-organizacion/" },
          { text: "Logo para documentos", url: "https://siigonube.portaldeclientes.siigo.com/subir-logo-para-documentos/" },
          { text: "Creacion de Usuarios", url: "https://siigonube.portaldeclientes.siigo.com/crear-usuarios/" },
          { text: "Invita a tu contador", url: "https://siigonube.portaldeclientes.siigo.com/crear-usuario-contador/" },
          { text: "Terceros (interfaz de proveedor y clientes)", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-terceros/" },
          { text: "Impuestos", url: "https://siigonube.portaldeclientes.siigo.com/crear-impuestos-autorretencion-iva-retefuente-reteica-entre-otros/" },
          { text: "Cuentas contables", url: "https://siigonube.portaldeclientes.siigo.com/crear-cuentas-contables/" },
          { text: "Centros de Costos", url: "https://siigonube.portaldeclientes.siigo.com/crear-centros-de-costo/" },
          { text: "Gastos / Costos frecuentes", url: "https://siigonube.portaldeclientes.siigo.com/crear-gastos-frecuentes/" },
          { text: "Formas de pago en documentos", url: "https://siigonube.portaldeclientes.siigo.com/crear-formas-de-pago/" },
          { text: "Categorias de inventario y servicio", url: "https://siigonube.portaldeclientes.siigo.com/crear-categorias-de-productos-y-servicios-preimplementadas/" },
          { text: "Manejo de bodegas", url: "https://siigonube.portaldeclientes.siigo.com/crear-bodegas/" },
          { text: "Listas de precios de venta", url: "https://siigonube.portaldeclientes.siigo.com/definir-nombres-de-listas-de-precios/" },
          { text: "Productos y Servicios (interfaz de productos y servicios)", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-productos/" }
        ]
      }
    ],
    prerequisiteTitle: "Habilitación de documentos y saldos iniciales",
    prerequisite: "Tener el perfil de la organización completa, cuentas contables, terceros (interfaz), categorias e inventario, resoluciones para venta, documento soporte, tener cuenta bancario y banco"
  },
  {
    webinar: "Webinar 2",
    links: [
      { text: "Habilitación de facturación electrónica Parte 1 (Pasos 1, 2, 3 y 4)", url: "https://us06web.zoom.us/webinar/register/WN_Z0Zenw_SQ-qjVCdiEDvOwg#/registration" },
      { text: "Habilitación de aacturación electrónica Parte 2 (Pasos 4, 5 y 6)", url: "https://us06web.zoom.us/webinar/register/WN_LIQsinIbRLCZ6coF-W_DAA#/registration" }
    ],
    sections: [
      {
        subtitle: "Habilitación de documentos y saldos iniciales",
        items: [
          { text: "Incorporacion de Interfaces de saldos iniciales inventarios", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-saldos-iniciales-de-inventario/" },
          { text: "Incorporacion de Interfaces de saldos iniciales Clientes", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-saldos-iniciales-cartera/" },
          { text: "Incorporacion de Interfaces de saldos iniciales Proveedores", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-saldos-iniciales-proveedores/" },
          { text: "Incorporacion de Interfaces de saldos iniciales otros saldos ( saldos de otras cuentas contables)", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-saldos-iniciales-de-otras-cuentas/" },
          { text: "Habilitacion facturacion Electronica", url: "https://siigonube.portaldeclientes.siigo.com/subir-desde-excel-saldos-iniciales-de-otras-cuentas/" },
          { text: "Habilitacion documento Soporte", url: "https://siigonube.portaldeclientes.siigo.com/habilitar-documento-soporte-electronico/" },
          { text: "Parametros de Documentos", url: "https://siigonube.portaldeclientes.siigo.com/configurar-comprobantes-contables/" },
          { text: "Parametros Siigo Pay", url: "https://siigonube.portaldeclientes.siigo.com/configurar-siigo-pay/" },
          { text: "Elaboracion facturas", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-factura-electronica-de-venta/" },
          { text: "Elaboracion recibo de caja", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-recibo-de-caja/" },
          { text: "Elaboracion de Comprobante Contable", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-comprobante-contable/" },
          { text: "Translado de dinero", url: "https://siigonube.portaldeclientes.siigo.com/registrar-traslado-de-dinero/" }
        ]
      }
    ],
    prerequisiteTitle: "Tareas para compras y gastos",
    prerequisite: "Tener la informacion de saldos iniciales de inventario, terceros (cartera, cxp) y otros saldos de cuentas, tener el listado de los activo."
  },
  {
    webinar: "Webinar 3",
    links: [
      { text: "Proceso de Compras y Gastos", url: "https://zoom.us/webinar/register/WN_L1ewnHyDS9iVloP9bOtfTw#/registration" }
    ],
    sections: [
      {
        subtitle: "Elaboración de compras y gastos",
        items: [
          { text: "Elaboracion Factura de Compra", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-factura-de-compra/" },
          { text: "Elaboracion de Documento Soporte", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-documento-soporte-fisico/" },
          { text: "Elaboracion de nota debito", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-nota-debito/" },
          { text: "Crear grupo de activo", url: "https://siigonube.portaldeclientes.siigo.com/crear-grupos-de-activos-fijos/" },
          { text: "Creación de activos fijos", url: "https://siigonube.portaldeclientes.siigo.com/crear-activos-fijos/" },
          { text: "Orden de Compra", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-orden-de-compra/" },
          { text: "Gastos y Costos Frecuentes", url: "https://siigonube.portaldeclientes.siigo.com/registrar-gastos/" },
          { text: "Comprobante de Pago/Egresos", url: "https://siigonube.portaldeclientes.siigo.com/elaborar-un-recibo-de-pago-egreso/" }
        ]
      }
    ],
    prerequisiteTitle: "Tareas para informes",
    prerequisite: "Tener registrada informacion en el programa para revision de reportes"
  },
  {
    webinar: "Webinar 4",
    links: [
      { text: "Generación y Análisis de Reportes en Siigo Nube", url: "https://us06web.zoom.us/webinar/register/WN_wAsDrSdkRD2K-kodhrsdOg#/registration" }
    ],
    sections: [
      {
        subtitle: "Informes",
        items: [
          { text: "Reportes de Ventas", url: "https://siigonube.portaldeclientes.siigo.com/generar-informes-de-ventas/" },
          { text: "Reporte saldos y movimientos de productos", url: "https://siigonube.portaldeclientes.siigo.com/generar-reporte-movimiento-de-productos-kardex/" },
          { text: "Reporte de cuentas por cobrar", url: "https://siigonube.portaldeclientes.siigo.com/generar-reporte-cuentas-por-cobrar-general-por-cliente/" },
          { text: "Reporte de cuentas por pagar", url: "https://siigonube.portaldeclientes.siigo.com/generar-reporte-cuentas-por-pagar-general-por-proveedor/" },
          { text: "Reportes de Compras y Gastos", url: "https://siigonube.portaldeclientes.siigo.com/generar-informe-de-transacciones-de-compras/" },
          { text: "Reportes Financieros y Contables", url: "https://siigonube.portaldeclientes.siigo.com/informes-financieros-y-contables/" },
          { text: "Medios magnéticos", url: "https://siigonube.portaldeclientes.siigo.com/generar-asistente-de-medios-magneticos-2024/" },
          { text: "Crm ( Seguimientos Comercial y de Cobranza)", url: "https://siigonube.portaldeclientes.siigo.com/configurar-seguimiento-comercial/" },
          { text: "Cierre de implementacion" }
        ]
      }
    ]
  }
];

export default function SiigoAgenda() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    e.preventDefault();
    const savedName = localStorage.getItem('siigo_user_name') || 'Usuario Desconocido';
    const savedEmail = localStorage.getItem('siigo_user_email') || 'N/A';

    const currentLogs = JSON.parse(localStorage.getItem('siigo_clicks_log') || '[]');
    currentLogs.push({
      userName: savedName,
      userEmail: savedEmail,
      clickedItem: title,
      url,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('siigo_clicks_log', JSON.stringify(currentLogs));
    
    // Disparar evento para que el dashboard se actualice si está abierto
    window.dispatchEvent(new Event('storage'));

    window.open(url, '_blank');
  };

  return (
    <div className="siigo-agenda-container">
      <div className="agenda-header">
        <h2>Agenda de Implementación SIIGO Nube</h2>
        <p>A continuación se listan las capacitaciones (Webinars), los manuales paso a paso y los prerrequisitos necesarios en cada fase.</p>
      </div>

      <div className="agenda-grid">
        {agendaData.map((phase, idx) => (
          <div key={idx} className="agenda-card">
            <div className="card-top-bar"></div>
            <div className="card-inner">
              <h3 className="webinar-title">
                <Video size={24} className="icon-video" />
                {phase.webinar}
              </h3>

              <div className="webinar-links">
                {phase.links.map((link, i) => (
                  <a key={i} href={link.url} onClick={(e) => handleLinkClick(e, link.url, link.text)} className="zoom-link">
                    {link.text}
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>

              {phase.sections.map((sec, i) => (
                <div key={i} className="agenda-section">
                  <h4 className="section-subtitle">{sec.subtitle}</h4>
                  <ul className="agenda-topics">
                    {sec.items.map((item, j) => (
                      <li key={j}>
                        {item.url ? (
                          <a href={item.url} onClick={(e) => handleLinkClick(e, item.url, item.text)} className="topic-link">
                            <BookOpen size={14} />
                            {item.text}
                          </a>
                        ) : (
                          <span className="topic-text">
                            <CheckCircle size={14} className="icon-check" />
                            {item.text}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {phase.prerequisite && (
                <div className="prerequisite-box">
                  <h5><AlertCircle size={16} /> Tareas: {phase.prerequisiteTitle}</h5>
                  <p>{phase.prerequisite}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .siigo-agenda-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .agenda-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .agenda-header h2 {
          font-size: 2rem;
          color: #0f172a;
          margin-bottom: 10px;
        }
        .agenda-header p {
          color: #64748b;
          font-size: 1.1rem;
        }
        .agenda-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .agenda-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .card-top-bar {
          height: 6px;
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          width: 100%;
        }
        .card-inner {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .webinar-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          color: #1e293b;
          margin: 0 0 20px 0;
          font-weight: 700;
        }
        .icon-video {
          color: #3b82f6;
        }
        .webinar-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .zoom-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #eff6ff;
          color: #2563eb;
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          border: 1px solid #bfdbfe;
        }
        .zoom-link:hover {
          background: #dbeafe;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
        }
        .agenda-section {
          margin-bottom: 24px;
        }
        .section-subtitle {
          color: #334155;
          font-size: 1.1rem;
          margin: 0 0 12px 0;
          font-weight: 600;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .agenda-topics {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .agenda-topics li {
          font-size: 0.9rem;
        }
        .topic-link {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.4;
        }
        .topic-link svg {
          color: #64748b;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .topic-link:hover {
          color: #2563eb;
          text-decoration: underline;
        }
        .topic-link:hover svg {
          color: #2563eb;
        }
        .topic-text {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #64748b;
          font-weight: 500;
          line-height: 1.4;
        }
        .icon-check {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .prerequisite-box {
          margin-top: auto;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 8px;
          padding: 16px;
        }
        .prerequisite-box h5 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 8px 0;
          color: #b45309;
          font-size: 0.95rem;
        }
        .prerequisite-box p {
          margin: 0;
          color: #92400e;
          font-size: 0.85rem;
          line-height: 1.5;
        }
      `}} />
    </div>
  );
}
