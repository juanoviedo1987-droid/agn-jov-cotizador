import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  UserCheck, 
  Send, 
  CheckCircle2, 
  Maximize2, 
  ShieldCheck, 
  ArrowRight, 
  BarChart3,
  BadgeDollarSign
} from 'lucide-react';
import { UNIVERSAL_RUBROS, calcularCotizacionUniversal } from './pricingConfig';
import WebAGNSection from './WebAGNSection';
import DemoModulo3 from './DemoModulo3';

export default function App() {
  // Función para resolver la pestaña a partir del hash de la URL
  // Por defecto, la primera solapa es 'precios'
  const getTabFromHash = () => {
    if (typeof window === 'undefined') return 'precios';
    const hash = window.location.hash.toLowerCase().replace('#', '');
    if (hash === 'cotizador' || hash === 'ejemplo1' || hash === 'taller' || hash === 'modulo1') return 'cotizador';
    if (hash === 'filtro' || hash === 'ejemplo2' || hash === 'filtro_cliente' || hash === 'modulo2') return 'filtro';
    if (hash === 'crm' || hash === 'ejemplo3' || hash === 'crm_demo' || hash === 'modulo3') return 'crm';
    if (hash === 'precios' || hash === 'servicios' || hash === 'agn' || hash === 'inicio') return 'precios';
    return 'precios'; // Portada por defecto: Precios y Propuesta Comercial
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getTabFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const hashMapping = {
      precios: 'precios',
      cotizador: 'ejemplo1',
      filtro: 'ejemplo2',
      crm: 'ejemplo3'
    };
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${hashMapping[tabId] || tabId}`);
    }
    // Scroll suave hacia arriba al cambiar de pestaña
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Selector multimoneda global
  const [moneda, setMoneda] = useState('USD'); // 'USD' | 'UYU' | 'ARS'

  // Selector de Rubro de Ejemplo en la Demo del Cotizador
  const [rubroId, setRubroId] = useState('aberturas');
  const rubroActual = UNIVERSAL_RUBROS.find(r => r.id === rubroId) || UNIVERSAL_RUBROS[0];

  // Estado del Cotizador Móvil (Ejemplo 1)
  const [cotizadorForm, setCotizadorForm] = useState({
    productoId: rubroActual.productos[0].id,
    ancho: rubroActual.productos[0].anchoDefault,
    alto: rubroActual.productos[0].altoDefault,
    cantidad: 1,
    calidadId: 'media',
    incluyeServicio: true,
    clienteNombre: 'Carlos Méndez',
    clienteTelefono: '099123456'
  });

  const handleCambioRubro = (nuevoRubroId) => {
    setRubroId(nuevoRubroId);
    const nuevoRubro = UNIVERSAL_RUBROS.find(r => r.id === nuevoRubroId) || UNIVERSAL_RUBROS[0];
    const primerProd = nuevoRubro.productos[0];
    setCotizadorForm(prev => ({
      ...prev,
      productoId: primerProd.id,
      ancho: primerProd.anchoDefault,
      alto: primerProd.altoDefault,
      cantidad: 1,
      calidadId: nuevoRubro.calidades[1]?.id || nuevoRubro.calidades[0].id
    }));
  };

  const handleCambioProducto = (prodId) => {
    const prod = rubroActual.productos.find(p => p.id === prodId) || rubroActual.productos[0];
    setCotizadorForm(prev => ({
      ...prev,
      productoId: prodId,
      ancho: prod.anchoDefault,
      alto: prod.altoDefault
    }));
  };

  const cotizacion = calcularCotizacionUniversal({
    rubroId,
    productoId: cotizadorForm.productoId,
    ancho: cotizadorForm.ancho,
    alto: cotizadorForm.alto,
    cantidad: cotizadorForm.cantidad,
    calidadId: cotizadorForm.calidadId,
    incluyeServicio: cotizadorForm.incluyeServicio
  });

  const handleEnviarWhatsApp = () => {
    if (!cotizacion) return;

    let telLimpio = cotizadorForm.clienteTelefono.replace(/\D/g, '');
    if (telLimpio.startsWith('0')) {
      telLimpio = '598' + telLimpio.substring(1);
    } else if (!telLimpio.startsWith('598')) {
      telLimpio = '598' + telLimpio;
    }

    const textoPrecio = moneda === 'USD' 
      ? `*USD ${cotizacion.precioFinalUSD}* (o aprox. $ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU)`
      : `*$ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU* (o aprox. USD ${cotizacion.precioFinalUSD})`;

    const mensaje = `Hola ${cotizadorForm.clienteNombre || 'estimado/a'}! 👋\n` +
      `Te paso el presupuesto formal para tu consulta de *${rubroActual.nombre}*:\n\n` +
      `📦 *Trabajo / Concepto:* ${cotizacion.producto.nombre}\n` +
      `📏 *Especificación / Medidas:* ${cotizacion.medidasTexto}\n` +
      `⭐ *Nivel de Terminación:* ${cotizacion.calidad.nombre}\n` +
      (cotizadorForm.incluyeServicio ? `✅ *Incluye:* ${rubroActual.servicioLabel}\n\n` : `\n`) +
      `💰 *Total Presupuestado:* ${textoPrecio}\n\n` +
      `⏱️ *Plazo estimado:* 7 a 15 días hábiles.\n` +
      `📋 *Validez:* 15 días corridos.\n\n` +
      `¿Querés que coordinemos una visita técnica para rectificar medidas o tenés alguna consulta?`;

    const url = `https://wa.me/${telLimpio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // Estado del Formulario Ejemplo 2 (Filtro Captación Web)
  const [filtroForm, setFiltroForm] = useState({
    nombre: '',
    telefono: '',
    zona: 'Montevideo / Canelones',
    trabajo: rubroActual.productos[0].nombre,
    medidasDetalle: '150 x 120 cm aprox'
  });
  const [filtroEnviado, setFiltroEnviado] = useState(false);

  const handleEnviarFiltro = (e) => {
    e.preventDefault();
    setFiltroEnviado(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-purple-500 selection:text-white">
      
      {/* Header Corporativo Grupo AGN */}
      <header className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] text-white shadow-lg sticky top-0 z-50 border-b border-purple-800/40">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          
          <div className="flex items-center justify-between w-full sm:w-auto">
            <button 
              type="button"
              onClick={() => handleTabChange('precios')}
              className="flex flex-col text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">GRUPO AGN</span>
                <span className="bg-gradient-to-r from-[#e6007e] to-[#cb69fc] text-white text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  Apps para PyMEs
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-purple-200 font-medium">Desarrollo de Software & Automatizaciones</span>
            </button>
          </div>

          {/* Menú de Navegación Mobile-First: 1° Precios y luego los 3 Ejemplos */}
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
            <div className="bg-[#1f0a40]/90 p-1 rounded-2xl flex items-center border border-purple-400/20 backdrop-blur-sm min-w-max mx-auto sm:mx-0">
              
              {/* 1. Solapa Precios & Propuesta (Primera solapa) */}
              <button
                type="button"
                onClick={() => handleTabChange('precios')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'precios'
                    ? 'bg-gradient-to-r from-[#e6007e] to-[#cb69fc] text-white shadow-md border border-pink-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <BadgeDollarSign className="w-3.5 h-3.5" />
                <span>Precios & Servicios</span>
              </button>

              {/* 2. Solapa Ejemplo 1: Cotizador */}
              <button
                type="button"
                onClick={() => handleTabChange('cotizador')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'cotizador'
                    ? 'bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white shadow-md border border-purple-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Ejemplo 1: Cotizador</span>
              </button>

              {/* 3. Solapa Ejemplo 2: Filtro Web */}
              <button
                type="button"
                onClick={() => handleTabChange('filtro')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'filtro'
                    ? 'bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white shadow-md border border-purple-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Ejemplo 2: Filtro Web</span>
              </button>

              {/* 4. Solapa Ejemplo 3: Mini CRM */}
              <button
                type="button"
                onClick={() => handleTabChange('crm')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'crm'
                    ? 'bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white shadow-md border border-purple-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Ejemplo 3: Mini CRM</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-4 pb-16">

        {/* ==================================================== */}
        {/* SOLAPA 1 (INICIO): PRECIOS & SERVICIOS GRUPO AGN     */}
        {/* ==================================================== */}
        {activeTab === 'precios' && (
          <WebAGNSection onSelectModule={(tab) => handleTabChange(tab)} />
        )}

        {/* ==================================================== */}
        {/* SOLAPA 2: EJEMPLO 1 (COTIZADOR MÓVIL EXPRESS)        */}
        {/* ==================================================== */}
        {activeTab === 'cotizador' && (
          <div className="space-y-4">

            {/* Aviso Destacado: Esto es un Ejemplo y se trabaja a medida */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#4a208e] text-white rounded-lg font-bold shrink-0">📌</span>
                <span className="text-purple-950 font-medium leading-relaxed">
                  <strong>Demostración Interactiva • Ejemplo 1:</strong> Esta pantalla muestra cómo funciona un cotizador en el celular. Cada app se entrega <strong>100% personalizada con tus propios productos, fórmulas y listas de precios</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange('precios')}
                className="text-[11px] font-extrabold text-[#4a208e] bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-lg shrink-0 transition-all"
              >
                Ver Precios & Alcance →
              </button>
            </div>

            {/* Banner de Bienvenida del Ejemplo y Selector de Rubro */}
            <div className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#2c1256] rounded-3xl p-4 sm:p-5 text-white shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#cb69fc] bg-purple-950/50 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-purple-400/20">
                    Ejemplo en Vivo • Cotizador de Bolsillo
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold">Cotizá en 20 segundos delante de tu cliente</h2>
                  <p className="text-xs text-purple-200 mt-0.5">
                    Cambiá de rubro para ver cómo se adapta la calculadora a distintos negocios:
                  </p>
                </div>

                {/* Selector de Moneda */}
                <div className="bg-purple-950/80 p-1 rounded-xl border border-purple-400/20 flex items-center text-xs font-bold shrink-0 self-end sm:self-auto">
                  {['USD', 'UYU', 'ARS'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMoneda(m)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        moneda === m ? 'bg-[#e6007e] text-white shadow-xs' : 'text-purple-200 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pills de Selección de Rubro de Ejemplo */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                {UNIVERSAL_RUBROS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleCambioRubro(r.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border min-h-[44px] ${
                      rubroId === r.id
                        ? 'bg-white text-[#4a208e] border-white shadow-md scale-[1.02]'
                        : 'bg-purple-900/40 text-purple-200 border-purple-400/20 hover:bg-purple-900/70'
                    }`}
                  >
                    <span>{r.icono}</span>
                    <span>{r.nombre}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulario Simplificado en Tarjeta */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              <div className="md:col-span-7 space-y-4">
                <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-purple-100 space-y-4">
                  
                  {/* 1. Producto */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      1. Trabajo o Producto a Cotizar
                    </label>
                    <select
                      value={cotizadorForm.productoId}
                      onChange={(e) => handleCambioProducto(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                    >
                      {rubroActual.productos.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Medidas o Cantidad */}
                  {rubroActual.unidadTipo === 'dimensiones' ? (
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Maximize2 className="w-4 h-4 text-[#4a208e]" /> 2. Dimensiones (cm)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs text-slate-500 block mb-1 font-medium">Ancho (cm)</span>
                          <input
                            type="number"
                            min="30"
                            max="600"
                            step="5"
                            value={cotizadorForm.ancho}
                            onChange={(e) => setCotizadorForm({ ...cotizadorForm, ancho: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-base font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 block mb-1 font-medium">Alto (cm)</span>
                          <input
                            type="number"
                            min="30"
                            max="600"
                            step="5"
                            value={cotizadorForm.alto}
                            onChange={(e) => setCotizadorForm({ ...cotizadorForm, alto: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-base font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        2. Cantidad de Unidades / Puntos
                      </label>
                      <div className="flex items-center gap-3">
                        {[1, 2, 3, 5].map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            onClick={() => setCotizadorForm({ ...cotizadorForm, cantidad: cnt })}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                              cotizadorForm.cantidad === cnt
                                ? 'bg-[#4a208e] text-white border-[#4a208e] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {cnt} {cnt === 1 ? 'unidad' : 'unidades'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Nivel de Terminación */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#4a208e]" /> 3. Nivel de Terminación / Gama
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {rubroActual.calidades.map((cal) => (
                        <button
                          key={cal.id}
                          type="button"
                          onClick={() => setCotizadorForm({ ...cotizadorForm, calidadId: cal.id })}
                          className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between min-h-[56px] ${
                            cotizadorForm.calidadId === cal.id
                              ? 'bg-purple-50/70 border-[#4a208e] ring-2 ring-purple-200 text-slate-900'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#e6007e]">
                            {cal.badge}
                          </span>
                          <span className="text-xs font-bold leading-tight mt-0.5">
                            {cal.nombre}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Servicio Adicional */}
                  <label className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cotizadorForm.incluyeServicio}
                      onChange={(e) => setCotizadorForm({ ...cotizadorForm, incluyeServicio: e.target.checked })}
                      className="w-5 h-5 text-[#4a208e] rounded-lg accent-[#4a208e]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">{rubroActual.servicioLabel}</span>
                      <span className="text-slate-500">Suma mano de obra e instalación</span>
                    </div>
                  </label>

                  {/* Datos del Cliente */}
                  <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1 font-medium">Nombre Cliente</span>
                      <input
                        type="text"
                        value={cotizadorForm.clienteNombre}
                        onChange={(e) => setCotizadorForm({ ...cotizadorForm, clienteNombre: e.target.value })}
                        placeholder="Ej: Carlos Méndez"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1 font-medium">WhatsApp</span>
                      <input
                        type="tel"
                        value={cotizadorForm.clienteTelefono}
                        onChange={(e) => setCotizadorForm({ ...cotizadorForm, clienteTelefono: e.target.value })}
                        placeholder="099 123 456"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Columna Derecha: Tarjeta de Presupuesto & Despacho WhatsApp */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100 space-y-4 sticky top-20">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-extrabold uppercase text-[#4a208e] tracking-wider">
                      Resumen del Presupuesto
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Calculado en Vivo
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Concepto:</span>
                      <span className="font-bold text-slate-800 text-right">{cotizacion?.producto.nombre}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Medidas / Cantidad:</span>
                      <span className="font-bold text-slate-800">{cotizacion?.medidasTexto}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Gama / Calidad:</span>
                      <span className="font-bold text-slate-800">{cotizacion?.calidad.badge}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Servicio en obra:</span>
                      <span className="font-bold text-slate-800">{cotizadorForm.incluyeServicio ? 'Incluido' : 'No incluido'}</span>
                    </div>
                  </div>

                  {/* Gran Total */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50/40 rounded-2xl p-4 border border-purple-100 text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#4a208e] tracking-wider block">
                      Total al Cliente ({moneda})
                    </span>
                    <div className="text-3xl font-black text-slate-900">
                      {moneda === 'USD' && `USD ${cotizacion?.precioFinalUSD}`}
                      {moneda === 'UYU' && `$ ${cotizacion?.precioFinalUYU.toLocaleString('es-UY')}`}
                      {moneda === 'ARS' && `$ ${cotizacion?.precioFinalARS.toLocaleString('es-AR')}`}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {moneda === 'USD' && `≈ $ ${cotizacion?.precioFinalUYU.toLocaleString('es-UY')} UYU`}
                      {moneda === 'UYU' && `≈ USD ${cotizacion?.precioFinalUSD}`}
                      {moneda === 'ARS' && `≈ USD ${cotizacion?.precioFinalUSD}`}
                    </div>
                  </div>

                  {/* Botón WhatsApp */}
                  <button
                    type="button"
                    onClick={handleEnviarWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-slate-900 font-extrabold py-3.5 px-4 rounded-2xl shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 text-sm transition-all min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Presupuesto por WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Abre WhatsApp con el mensaje formal estructurado y listo para despachar.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* SOLAPA 3: EJEMPLO 2 (FILTRO WEB DE CAPTACIÓN)        */}
        {/* ==================================================== */}
        {activeTab === 'filtro' && (
          <div className="max-w-xl mx-auto space-y-4">
            
            {/* Aviso Destacado */}
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#e6007e] text-white rounded-lg font-bold shrink-0">📌</span>
                <span className="text-pink-950 font-medium leading-relaxed">
                  <strong>Demostración Interactiva • Ejemplo 2:</strong> Este es el formulario que tus clientes completan desde tu Instagram o WhatsApp. Se personaliza con tu logo y las preguntas exactas que necesita tu negocio.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange('precios')}
                className="text-[11px] font-extrabold text-[#e6007e] bg-pink-100 hover:bg-pink-200 px-3 py-1.5 rounded-lg shrink-0 transition-all"
              >
                Ver Precios & Alcance →
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-950 via-purple-950 to-[#2c1256] rounded-3xl p-5 text-white shadow-sm space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#e6007e] text-white px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-xs">
                Ejemplo en Vivo • Filtro Web
              </span>
              <h2 className="text-xl font-bold">Formulario de Captación para Redes Sociales</h2>
              <p className="text-xs text-pink-200 mt-0.5 leading-relaxed">
                El cliente carga sus datos reales y medidas antes de pedir cotización, filtrando a los curiosos.
              </p>
            </div>

            {filtroEnviado ? (
              <div className="bg-white rounded-3xl p-6 text-center space-y-4 border border-emerald-200 shadow-sm">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">¡Solicitud recibida con éxito!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  El negocio recibió tus datos verificados. En menos de 24 horas te contactarán por WhatsApp con el presupuesto formal detallado.
                </p>
                <button
                  type="button"
                  onClick={() => setFiltroEnviado(false)}
                  className="bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all"
                >
                  Probar enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnviarFiltro} className="bg-white rounded-3xl p-5 shadow-xs border border-purple-100 space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    1. ¿Qué estás buscando presupuestar?
                  </label>
                  <input
                    type="text"
                    required
                    value={filtroForm.trabajo}
                    onChange={(e) => setFiltroForm({ ...filtroForm, trabajo: e.target.value })}
                    placeholder="Ej: Mueble bajo mesada, ventana para living, service de split..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. Medidas aproximadas o detalles del trabajo
                  </label>
                  <input
                    type="text"
                    value={filtroForm.medidasDetalle}
                    onChange={(e) => setFiltroForm({ ...filtroForm, medidasDetalle: e.target.value })}
                    placeholder="Ej: 150 cm x 120 cm aprox"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                  />
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-3">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                    3. ¿A dónde te enviamos el presupuesto?
                  </label>

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Nombre y Apellido *</span>
                    <input
                      type="text"
                      required
                      value={filtroForm.nombre}
                      onChange={(e) => setFiltroForm({ ...filtroForm, nombre: e.target.value })}
                      placeholder="Ej: Martín Silva"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">WhatsApp de Contacto *</span>
                      <input
                        type="tel"
                        required
                        value={filtroForm.telefono}
                        onChange={(e) => setFiltroForm({ ...filtroForm, telefono: e.target.value })}
                        placeholder="Ej: 099 123 456"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Zona / Barrio</span>
                      <input
                        type="text"
                        value={filtroForm.zona}
                        onChange={(e) => setFiltroForm({ ...filtroForm, zona: e.target.value })}
                        placeholder="Ej: Pocitos, Montevideo"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4a208e] to-[#5a207e] hover:opacity-95 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 text-xs transition-all min-h-[48px]"
                >
                  <span>Pedir Cotización Formal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        )}

        {/* ==================================================== */}
        {/* SOLAPA 4: EJEMPLO 3 (MINI CRM & ALERTAS 48H)          */}
        {/* ==================================================== */}
        {activeTab === 'crm' && (
          <div className="space-y-4">
            
            {/* Aviso Destacado */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-indigo-600 text-white rounded-lg font-bold shrink-0">📌</span>
                <span className="text-indigo-950 font-medium leading-relaxed">
                  <strong>Demostración Interactiva • Ejemplo 3:</strong> Panel de seguimiento para no perder ventas. Te alerta a las 48h para reenviar recordatorios por WhatsApp con 1 clic.
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange('precios')}
                className="text-[11px] font-extrabold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-lg shrink-0 transition-all"
              >
                Ver Precios & Alcance →
              </button>
            </div>

            <DemoModulo3 />
          </div>
        )}

      </main>

      {/* Footer Branding Grupo AGN */}
      <footer className="bg-white border-t border-purple-100 py-4 text-center text-xs text-slate-500">
        Potenciado por <strong className="text-[#4a208e]">Grupo AGN</strong> • Soluciones Tecnológicas & Marketing Digital para PyMEs
      </footer>
    </div>
  );
}
