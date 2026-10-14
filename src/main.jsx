import { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-100 shadow-xl space-y-4">
            <div className="inline-block px-3 py-1 bg-purple-100 text-[#4a208e] text-xs font-bold rounded-full uppercase tracking-wider">
              Grupo AGN
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Ocurrió un inconveniente al cargar
            </h2>
            <p className="text-xs text-slate-600">
              {this.state.error?.message || 'Error inesperado al inicializar la aplicación.'}
            </p>
            <button
              onClick={() => {
                window.location.hash = '';
                window.location.reload();
              }}
              className="w-full bg-[#4a208e] hover:bg-[#5a207e] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md"
            >
              Recargar Aplicación
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
