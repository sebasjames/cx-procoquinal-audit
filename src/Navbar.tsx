import { FileText, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: 'auditoria' | 'estado_actual';
  onTabChange: (tab: 'auditoria' | 'estado_actual') => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="top-navbar">
      <div className="navbar-inner">
        <div className="nav-brand">
          <div className="nav-brand-logo">
            <span>A</span>
          </div>
          <div className="nav-brand-info">
            <span className="nav-brand-title">Procoquinal OS</span>
            <span className="nav-brand-subtitle">Avalon AI</span>
          </div>
        </div>

        <nav className="nav-tabs-container" aria-label="Navegación principal">
          <button
            type="button"
            className={'nav-tab-button ' + (activeTab === 'auditoria' ? 'active' : '')}
            onClick={() => onTabChange('auditoria')}
            aria-selected={activeTab === 'auditoria'}
            role="tab"
          >
            <FileText className="nav-tab-icon" size={18} />
            <span>Auditoria</span>
          </button>

          <button
            type="button"
            className={'nav-tab-button ' + (activeTab === 'estado_actual' ? 'active' : '')}
            onClick={() => onTabChange('estado_actual')}
            aria-selected={activeTab === 'estado_actual'}
            role="tab"
          >
            <Activity className="nav-tab-icon" size={18} />
            <span>Estado Actual</span>
          </button>
        </nav>

        <div className="nav-right-meta">
          <span className="nav-status-pulse"></span>
          <span>Sistema Activo</span>
        </div>
      </div>
    </header>
  );
}