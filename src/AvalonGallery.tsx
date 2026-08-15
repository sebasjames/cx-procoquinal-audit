import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2,
  BadgeDollarSign, PackageSearch, FileSpreadsheet, BrainCircuit, Settings
} from 'lucide-react';
import './AvalonGallery.css';

type Slide = {
  id: string;
  title: string;
  image: string;
  description: string;
};

type Category = {
  id: string;
  name: string;
  iconName: string;
  slides: Slide[];
};

// We manually map icon names to actual Lucide components
const IconMap: Record<string, any> = {
  BadgeDollarSign,
  PackageSearch,
  FileSpreadsheet,
  BrainCircuit,
  Settings
};

const categoriesData: Category[] = [
  {
    id: 'ventas',
    name: 'Ventas & Ingresos',
    iconName: 'BadgeDollarSign',
    slides: [
      { id: 'ventas-ingresos', title: 'Dashboard Comercial', image: `\${import.meta.env.BASE_URL}screenshots/ventas-ingresos.webp`, description: 'Resumen gerencial del estado de las ventas, ingresos en tiempo real y cumplimiento de metas.' },
      { id: 'pos-b2b', title: 'Punto de Venta (B2B)', image: `\${import.meta.env.BASE_URL}screenshots/pos-b2b.webp`, description: 'Interfaz ágil para vendedores que permite facturación rápida y consulta de stock en tiempo real.' },
      { id: 'crm', title: 'Gestión de Clientes (CRM)', image: `\${import.meta.env.BASE_URL}screenshots/crm.webp`, description: 'Toda la vida del cliente: historial de compras, créditos, cartera y embudo de ventas.' },
      { id: 'desempeno-ventas', title: 'Desempeño de Ventas', image: `\${import.meta.env.BASE_URL}screenshots/desempeno-ventas.webp`, description: 'Análisis detallado del rendimiento por comercial, zonas y líneas de negocio.' },
      { id: 'atp', title: 'Disponibilidad ATP', image: `\${import.meta.env.BASE_URL}screenshots/atp.webp`, description: 'Cálculo de "Available To Promise" para nunca prometer inventario que ya está comprometido.' }
    ]
  },
  {
    id: 'operacion',
    name: 'Operación',
    iconName: 'PackageSearch',
    slides: [
      { id: 'centro-inventarios', title: 'Centro de Inventarios', image: `\${import.meta.env.BASE_URL}screenshots/centro-inventarios.webp`, description: 'Control maestro de existencias con filtros avanzados y valorización instantánea.' },
      { id: 'inventario-transito', title: 'Inventario Tránsito', image: `\${import.meta.env.BASE_URL}screenshots/inventario-transito.webp`, description: 'Trazabilidad de mercancía que viene en camino (importaciones o traslados) para anticipar ventas.' },
      { id: 'produccion-lotes', title: 'Producción y Lotes', image: `\${import.meta.env.BASE_URL}screenshots/produccion-lotes.webp`, description: 'Gestión de órdenes de ensamblaje (BOM) y control riguroso de trazabilidad de lotes.' },
      { id: 'ingesta-albaranes', title: 'Ingesta de Albaranes', image: `\${import.meta.env.BASE_URL}screenshots/ingesta-albaranes.webp`, description: 'Recepción de mercancía física contrastada contra las órdenes de compra en sistema.' },
      { id: 'etl', title: 'Asistente de Ingesta (ETL)', image: `\${import.meta.env.BASE_URL}screenshots/etl.webp`, description: 'Mapeador inteligente de datos para importar catálogos enteros desde Excel con cero fricción.' }
    ]
  },
  {
    id: 'contabilidad',
    name: 'Contabilidad',
    iconName: 'FileSpreadsheet',
    slides: [
      { id: 'sabana-general', title: 'Sábana General', image: `\${import.meta.env.BASE_URL}screenshots/sabana-general.webp`, description: 'El libro mayor del sistema donde aterrizan todos los movimientos financieros y operativos.' },
      { id: 'activos-liquidez', title: 'Activos & Liquidez', image: `\${import.meta.env.BASE_URL}screenshots/activos-liquidez.webp`, description: 'Monitor de cuentas bancarias, flujo de caja proyectado y liquidez en tiempo real.' },
      { id: 'cierres-caja', title: 'Cierres de Caja', image: `\${import.meta.env.BASE_URL}screenshots/cierres-caja.webp`, description: 'Reportes Z y arqueos cuadradando el efectivo físico contra las ventas registradas.' },
      { id: 'facturacion-ventas', title: 'Facturación (Ventas)', image: `\${import.meta.env.BASE_URL}screenshots/facturacion-ventas.webp`, description: 'Auditoría de facturas emitidas, estados ante la DIAN y validación de XML.' },
      { id: 'devoluciones', title: 'Devoluciones', image: `\${import.meta.env.BASE_URL}screenshots/devoluciones.webp`, description: 'Gestión de notas crédito y re-ingreso de mercancía al inventario de forma controlada.' },
      { id: 'exportacion-siigo', title: 'Exportación SIIGO', image: `\${import.meta.env.BASE_URL}screenshots/exportacion-siigo.webp`, description: 'Generación automática de plantillas compatibles con SIIGO para la conciliación externa.' },
      { id: 'carga-edi', title: 'Carga de Facturas (EDI)', image: `\${import.meta.env.BASE_URL}screenshots/carga-edi.webp`, description: 'Lectura automatizada de archivos estructurados para causar facturas de proveedores masivamente.' },
      { id: 'facturas-correo', title: 'Facturas por Correo', image: `\${import.meta.env.BASE_URL}screenshots/facturas-correo.webp`, description: 'Buzón integrado que lee correos de proveedores y extrae datos con IA para crear compras automáticas.' },
      { id: 'conciliacion-datafonos', title: 'Conciliación Datáfonos', image: `\${import.meta.env.BASE_URL}screenshots/conciliacion-datafonos.webp`, description: 'Cruce automático de los extractos bancarios contra las ventas reportadas en los POS.' },
      { id: 'caja-menor', title: 'Caja Menor', image: `\${import.meta.env.BASE_URL}screenshots/caja-menor.webp`, description: 'Registro rápido de gastos menores, viáticos y reembolsos con su debida legalización.' }
    ]
  },
  {
    id: 'finanzas',
    name: 'Finanzas & Inteligencia',
    iconName: 'BrainCircuit',
    slides: [
      { id: 'informes-pedido', title: 'Informes de Pedido', image: `\${import.meta.env.BASE_URL}screenshots/informes-pedido.webp`, description: 'Sugerencias de abastecimiento que cruzan el stock actual, el lead time y la demanda esperada.' },
      { id: 'proyecciones', title: 'Proyecciones y Planeación', image: `\${import.meta.env.BASE_URL}screenshots/proyecciones.webp`, description: 'Modelos de pronóstico de demanda (Forecast) para preparar a la empresa para picos de ventas.' },
      { id: 'action-center', title: 'Centro de Acción / Alertas', image: `\${import.meta.env.BASE_URL}screenshots/action-center.webp`, description: 'Notificaciones críticas (stock out, moras) que requieren atención inmediata de los líderes.' },
      { id: 'impacto-financiero', title: 'Impacto Financiero', image: `\${import.meta.env.BASE_URL}screenshots/impacto-financiero.webp`, description: 'Visualización del costo de oportunidad y el capital inmovilizado en el inventario actual.' },
      { id: 'inteligencia-artificial', title: 'Inteligencia Artificial', image: `\${import.meta.env.BASE_URL}screenshots/inteligencia-artificial.webp`, description: 'Asistente (Copilot) que permite hacer preguntas en lenguaje natural sobre los datos del ERP.' },
      { id: 'analitica-avanzada', title: 'Analítica Avanzada', image: `\${import.meta.env.BASE_URL}screenshots/analitica-avanzada.webp`, description: 'Dashboards dinámicos e interactivos de Business Intelligence con cruce de múltiples variables.' },
      { id: 'gobierno-datos', title: 'Gobierno de Datos', image: `\${import.meta.env.BASE_URL}screenshots/gobierno-datos.webp`, description: 'Monitor de la salud de la información: identifica clientes sin NIT, SKUs duplicados, etc.' },
      { id: 'auditoria-terceros', title: 'Auditoría Terceros', image: `\${import.meta.env.BASE_URL}screenshots/auditoria-terceros.webp`, description: 'Log inmutable de eventos que registra quién, cuándo y cómo se modificó cualquier dato contable.' }
    ]
  },
  {
    id: 'configuracion',
    name: 'Configuración',
    iconName: 'Settings',
    slides: [
      { id: 'configuracion', title: 'Configuración Maestra', image: `\${import.meta.env.BASE_URL}screenshots/configuracion.webp`, description: 'Ajustes globales del sistema, roles, permisos y parámetros de conectividad (APIs, webhook).' }
    ]
  }
];

const AvalonGallery: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categoriesData[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      if (galleryRef.current) {
        await galleryRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      await document.exitFullscreen();
    }
  };

  const activeCategory = categoriesData.find(c => c.id === activeCategoryId)!;
  const currentSlide = activeCategory.slides[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeCategory.slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeCategory.slides.length) % activeCategory.slides.length);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setCurrentIndex(0); // Reset a la primera imagen al cambiar de pestaña
  };

  return (
    <section ref={galleryRef} className={`gallery-section ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="gallery-header">
        <div className="gallery-header-text">
          <h2>Galería Completa del Sistema</h2>
          <p>Un recorrido exhaustivo (31 Módulos) por Avalon OS, agrupado por áreas operativas.</p>
        </div>
        <button 
          className="fullscreen-gallery-btn" 
          onClick={toggleFullscreen}
          title="Pantalla Completa"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          {isFullscreen ? " Salir" : " Pantalla Completa (F11)"}
        </button>
      </div>

      {/* Navegación por Categorías (Tabs) */}
      <div className="gallery-tabs">
        {categoriesData.map(cat => {
          const Icon = IconMap[cat.iconName];
          const isActive = cat.id === activeCategoryId;
          return (
            <button 
              key={cat.id}
              className={`gallery-tab ${isActive ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <Icon size={18} />
              <span>{cat.name}</span>
              <span className="tab-count">{cat.slides.length}</span>
            </button>
          );
        })}
      </div>

      <div className="gallery-container">
        {/* Carrusel Principal */}
        <div className="carousel-wrapper">
          <button className="carousel-btn prev" onClick={handlePrev} disabled={activeCategory.slides.length <= 1}>
            <ChevronLeft size={28} />
          </button>

          <div className="carousel-content">
            <div className="slide-title-bar">
              <h3>{currentSlide.title}</h3>
              <div className="slide-badge">{currentIndex + 1} / {activeCategory.slides.length}</div>
            </div>
            
            <div className="slide-image-wrapper">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title} 
                className="slide-image"
              />
            </div>

            <div className="slide-description">
              <p>{currentSlide.description}</p>
            </div>
          </div>

          <button className="carousel-btn next" onClick={handleNext} disabled={activeCategory.slides.length <= 1}>
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Paginación de Puntitos */}
        {activeCategory.slides.length > 1 && (
          <div className="carousel-indicators">
            {activeCategory.slides.map((_, idx) => (
              <button 
                key={idx} 
                className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvalonGallery;
