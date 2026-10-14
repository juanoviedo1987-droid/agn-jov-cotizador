import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  UserCheck, 
  Send, 
  CheckCircle2, 
  User, 
  Maximize2, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { PRICING_CONFIG, calcularCotizacion } from './pricingConfig';
import WebAGNSection from './WebAGNSection';
import DemoModulo3 from './DemoModulo3';

export default function App() {
  // Función para resolver la pestaña a partir del hash de la URL
  const getTabFromHash = () => {
    if (typeof window === 'undefined') return 'taller';
    const hash = window.location.hash.toLowerCase().replace('#', '');
    if (hash === 'precios' || hash === 'catalogo' || hash === 'agn' || hash === 'web_agn') return 'web_agn';
    if (hash === 'modulo3' || hash === 'crm' || hash === 'crm_demo') return 'crm_demo';
    if (hash === 'modulo2' || hash === 'filtro' || hash === 'filtro_cliente') return 'filtro_cliente';
    if (hash === 'modulo1' || hash === 'taller' || hash === 'cotizador') return 'taller';
    return 'taller';
  };

  // Pestaña activa con sincronización bidireccional de hash
  const [activeTab, setActiveTab] = useState(getTabFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getTabFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Cambio de pestaña con actualización de hash
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const hashMapping = {
      taller: 'cotizador',
      filtro_cliente: 'filtro',
      crm_demo: 'modulo3',
      web_agn: 'precios'
    };
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${hashMapping[tabId] || tabId}`);
    }
  };

  // Selector multimoneda global
  const [moneda, setMoneda] = useState('USD'); // 'USD' | 'UYU' | 'ARS' | 'LOCAL'

  // Estado del Formulario Modo Taller (Carpintero)
  const [tallerForm, setTallerForm] = useState({
    anchoCm: 150,
    altoCm: 120,
    tipologiaId: 'corrediza_2h',
    lineaId: 'probba',
    vidrioId: 'dvh',
    colorId: 'anodizado_natural',
    clienteNombre: 'Carlos Méndez',
    clienteTelefono: '099123456',
    incluyeColocacion: true
  });

  // Estado del Formulario Modo Cliente (Filtro Captación)
  const [clienteForm, setClienteForm] = useState({
    tipologiaId: 'corrediza_2h',
    anchoAprox: 150,
    altoAprox: 120,
    calidadVidrio: 'dvh',
    nombre: '',
    telefono: '',
    zona: 'Montevideo / Canelones'
  });
  const [clienteEnviado, setClienteEnviado] = useState(false);

  // Cálculo en vivo para Modo Taller
  const cotizacion = calcularCotizacion({
    anchoCm: tallerForm.anchoCm,
    altoCm: tallerForm.altoCm,
    tipologiaId: tallerForm.tipologiaId,
    lineaId: tallerForm.lineaId,
    vidrioId: tallerForm.vidrioId,
    colorId: tallerForm.colorId
  });

  // Generador de mensaje WhatsApp
  const handleEnviarWhatsApp = () => {
    if (!cotizacion) return;

    let telLimpio = tallerForm.clienteTelefono.replace(/\D/g, '');
    if (telLimpio.startsWith('0')) {
      telLimpio = '598' + telLimpio.substring(1);
    } else if (!telLimpio.startsWith('598')) {
      telLimpio = '598' + telLimpio;
    }

    const textoPrecio = moneda === 'USD' 
      ? `*USD ${cotizacion.precioFinalUSD}* (o aprox. $ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU)`
      : `*$ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU* (o aprox. USD ${cotizacion.precioFinalUSD})`;

    const mensaje = `Hola ${tallerForm.clienteNombre || 'estimado/a'}! 👋\n` +
      `Te paso el presupuesto detallado de tu abertura:\n\n` +
      `🪟 *Tipología:* ${cotizacion.tipologia.nombre}\n` +
      `📏 *Medidas:* ${cotizacion.medidas.anchoCm} cm (ancho) x ${cotizacion.medidas.altoCm} cm (alto)\n` +
      `🏗️ *Línea:* ${cotizacion.linea.nombre}\n` +
      `🛡️ *Vidrio:* ${cotizacion.vidrio.nombre}\n` +
      `🎨 *Color:* ${cotizacion.color.nombre}\n` +
      (tallerForm.incluyeColocacion ? `✅ *Incluye:* Rectificación de medidas en obra y colocación.\n\n` : `\n`) +
      `💰 *Total:* ${textoPrecio}\n\n` +
      `⏱️ *Plazo de fabricación:* 10 a 15 días hábiles.\n` +
      `📋 *Validez del presupuesto:* 15 días corridos.\n\n` +
      `¿Querés que coordinemos una visita para rectificar medidas o tenés alguna consulta?`;

    const url = `https://wa.me/${telLimpio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleEnviarFiltroCliente = (e) => {
    e.preventDefault();
    setClienteEnviado(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-purple-500 selection:text-white">
      {/* Header Corporativo Grupo AGN */}
      <header className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] text-white shadow-lg sticky top-0 z-50 border-b border-purple-800/40">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">GRUPO AGN</span>
                <span className="bg-gradient-to-r from-[#e6007e] to-[#cb69fc] text-white text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                  Demo
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-purple-200 font-medium">Cotizador Express de Aberturas</span>
            </div>
          </div>

          {/* Switcher de Vista Mobile-First con scroll suave si la pantalla es chica */}
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
            <div className="bg-[#1f0a40]/90 p-1 rounded-2xl flex items-center border border-purple-400/20 backdrop-blur-sm min-w-max mx-auto sm:mx-0">
              <button
                onClick={() => handleTabChange('taller')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'taller'
                    ? 'bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white shadow-md border border-purple-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Módulo 1: Cotizador</span>
              </button>
              <button
                onClick={() => handleTabChange('filtro_cliente')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'filtro_cliente'
                    ? 'bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white shadow-md border border-purple-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Módulo 2: Filtro Web</span>
              </button>
              <button
                onClick={() => handleTabChange('crm_demo')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'crm_demo'
                    ? 'bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white shadow-md border border-purple-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Módulo 3: Mini CRM</span>
              </button>
              <button
                onClick={() => handleTabChange('web_agn')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                  activeTab === 'web_agn'
                    ? 'bg-gradient-to-r from-[#e6007e] to-[#cb69fc] text-white shadow-md border border-pink-300/30'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Catálogo Modular AGN</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-16">

        {/* ---------------------------------------------------- */}
        {/* VISTA 1: MODO TALLER (USO RÁPIDO DEL CARPINTERO)     */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'taller' && (
          <div className="space-y-4">
            {/* Banner superior con paleta AGN */}
            <div className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#2c1256] rounded-3xl p-5 text-white shadow-sm flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#cb69fc] bg-purple-950/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-purple-400/20">
                  Uso Interno del Taller
                </span>
                <h1 className="text-xl font-bold">Calculá y despachá cotizaciones al instante</h1>
                <p className="text-xs text-purple-200 mt-0.5">Ingresá medidas y enviá el presupuesto formal por WhatsApp en un toque.</p>
              </div>
              <div className="hidden sm:block absolute right-4 -bottom-6 opacity-10">
                <Wrench className="w-36 h-36" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Formulario de entrada rápida */}
              <div className="md:col-span-7 space-y-4">

                {/* 1. Medidas */}
                <div className="bg-white rounded-3xl p-4 shadow-xs border border-purple-100">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Maximize2 className="w-4 h-4 text-[#4a208e]" /> 1. Medidas de la abertura (cm)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 font-medium">Ancho (cm)</span>
                      <input
                        type="number"
                        value={tallerForm.anchoCm}
                        onChange={(e) => setTallerForm({ ...tallerForm, anchoCm: e.target.value })}
                        className="w-full text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 focus:ring-2 focus:ring-[#4a208e] focus:outline-none transition-all"
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 font-medium">Alto (cm)</span>
                      <input
                        type="number"
                        value={tallerForm.altoCm}
                        onChange={(e) => setTallerForm({ ...tallerForm, altoCm: e.target.value })}
                        className="w-full text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 focus:ring-2 focus:ring-[#4a208e] focus:outline-none transition-all"
                        placeholder="120"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Tipología */}
                <div className="bg-white rounded-3xl p-4 shadow-xs border border-purple-100">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Layers className="w-4 h-4 text-[#4a208e]" /> 2. Tipología
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRICING_CONFIG.tipologias.map((tipo) => (
                      <button
                        key={tipo.id}
                        type="button"
                        onClick={() => setTallerForm({ ...tallerForm, tipologiaId: tipo.id })}
                        className={`text-left p-3 rounded-2xl border text-xs font-medium transition-all ${
                          tallerForm.tipologiaId === tipo.id
                            ? 'border-[#4a208e] bg-[#f8f4fc] text-[#4a208e] font-bold shadow-xs ring-1 ring-[#4a208e]'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="font-bold text-sm">{tipo.nombre}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{tipo.descripcion}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Línea de Aluminio */}
                <div className="bg-white rounded-3xl p-4 shadow-xs border border-purple-100">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#4a208e]" /> 3. Línea de Perfilería (Uruguay)
                  </label>
                  <div className="space-y-2">
                    {PRICING_CONFIG.lineas.map((linea) => (
                      <div
                        key={linea.id}
                        onClick={() => setTallerForm({ ...tallerForm, lineaId: linea.id })}
                        className={`cursor-pointer p-3 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                          tallerForm.lineaId === linea.id
                            ? 'border-[#4a208e] bg-[#f8f4fc] ring-1 ring-[#4a208e]'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-900">{linea.nombre}</div>
                          <div className="text-[11px] text-slate-500">{linea.descripcion}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#4a208e] border border-purple-200">
                          {linea.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Vidrio y Color */}
                <div className="bg-white rounded-3xl p-4 shadow-xs border border-purple-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      4. Vidrio
                    </label>
                    <select
                      value={tallerForm.vidrioId}
                      onChange={(e) => setTallerForm({ ...tallerForm, vidrioId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#4a208e] focus:outline-none"
                    >
                      {PRICING_CONFIG.vidrios.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      5. Color de Aluminio
                    </label>
                    <select
                      value={tallerForm.colorId}
                      onChange={(e) => setTallerForm({ ...tallerForm, colorId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#4a208e] focus:outline-none"
                    >
                      {PRICING_CONFIG.colores.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Datos del Cliente */}
                <div className="bg-white rounded-3xl p-4 shadow-xs border border-purple-100">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <User className="w-4 h-4 text-[#4a208e]" /> 6. Destinatario para el WhatsApp
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Nombre del cliente</span>
                      <input
                        type="text"
                        value={tallerForm.clienteNombre}
                        onChange={(e) => setTallerForm({ ...tallerForm, clienteNombre: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#4a208e] focus:outline-none"
                        placeholder="Ej: Laura Rossi"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Celular (Uruguay)</span>
                      <input
                        type="text"
                        value={tallerForm.clienteTelefono}
                        onChange={(e) => setTallerForm({ ...tallerForm, clienteTelefono: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#4a208e] focus:outline-none"
                        placeholder="Ej: 099123456"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Lateral: Resumen de Cotización y Botón de WhatsApp */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-gradient-to-b from-[#2c1256] to-[#1a0836] text-white rounded-3xl p-5 shadow-xl border border-purple-900/40 sticky top-20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold text-[#cb69fc] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Cotización Instantánea
                    </span>
                    
                    {/* Selector Multimoneda */}
                    <div className="bg-[#1f0a40] p-0.5 rounded-xl border border-purple-400/20 flex items-center text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => setMoneda('USD')}
                        className={`px-2 py-0.5 rounded-lg transition-all ${
                          moneda === 'USD' ? 'bg-[#e6007e] text-white shadow' : 'text-purple-300 hover:text-white'
                        }`}
                      >
                        USD ($)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMoneda('LOCAL')}
                        className={`px-2 py-0.5 rounded-lg transition-all ${
                          moneda === 'LOCAL' ? 'bg-[#e6007e] text-white shadow' : 'text-purple-300 hover:text-white'
                        }`}
                      >
                        Local ($)
                      </button>
                    </div>
                  </div>

                  {cotizacion ? (
                    <div>
                      {/* Gran Precio Final (Multimoneda) */}
                      <div className="bg-purple-950/60 rounded-2xl p-4 border border-purple-400/20 text-center mb-4 backdrop-blur-sm">
                        <span className="text-xs text-purple-200 block mb-1 font-medium">Inversión Final Sugerida</span>
                        
                        {moneda === 'USD' ? (
                          <>
                            <div className="text-3xl font-black text-white tracking-tight">
                              USD {cotizacion.precioFinalUSD} <span className="text-sm font-semibold text-[#cb69fc]">Dólares</span>
                            </div>
                            <div className="text-xs text-purple-300 mt-1">
                              ≈ $ {cotizacion.precioFinalUYU.toLocaleString('es-UY')} (Moneda Local / Ref.)
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-3xl font-black text-white tracking-tight">
                              $ {cotizacion.precioFinalUYU.toLocaleString('es-UY')} <span className="text-sm font-semibold text-[#cb69fc]">Local</span>
                            </div>
                            <div className="text-xs text-purple-300 mt-1">
                              ≈ USD {cotizacion.precioFinalUSD} (Dólares)
                            </div>
                          </>
                        )}
                      </div>

                      {/* Desglose Técnico Estimado */}
                      <div className="space-y-2 text-xs text-purple-100 border-t border-purple-800/40 pt-3 mb-5">
                        <div className="flex justify-between">
                          <span className="text-purple-300">Perfilería estimada:</span>
                          <span className="font-semibold">{cotizacion.metrosLinealesPerfiles} m lineales</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Superficie de vidrio:</span>
                          <span className="font-semibold">{cotizacion.superficieM2} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Materiales estimados:</span>
                          <span className="font-semibold">
                            {moneda === 'USD' 
                              ? `USD ${Math.round(cotizacion.desglose.costoMateriales / PRICING_CONFIG.tipoCambioUSD)}`
                              : `$ ${cotizacion.desglose.costoMateriales.toLocaleString('es-UY')}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Mano de obra y taller:</span>
                          <span className="font-semibold">
                            {moneda === 'USD'
                              ? `USD ${Math.round(cotizacion.desglose.manoDeObra / PRICING_CONFIG.tipoCambioUSD)}`
                              : `$ ${cotizacion.desglose.manoDeObra.toLocaleString('es-UY')}`}
                          </span>
                        </div>
                      </div>

                      {/* Botón WhatsApp */}
                      <button
                        onClick={handleEnviarWhatsApp}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Presupuesto por WhatsApp</span>
                      </button>

                      <p className="text-[11px] text-purple-300 text-center mt-2.5">
                        Abre WhatsApp con el mensaje estructurado listo para enviar al cliente.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-purple-300 text-xs">
                      Ingresá ancho y alto para ver la cotización al instante.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VISTA 2: FILTRO DE CLIENTES (CAPTACIÓN PÚBLICA)      */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'filtro_cliente' && (
          <div className="max-w-xl mx-auto space-y-4">
            {/* Banner de explicación */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs text-center">
              <span className="bg-[#f8f4fc] text-[#4a208e] border border-purple-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Filtro Anti-Curiosos
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2.5">
                Solicitá tu Presupuesto de Aberturas
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Completá los datos en 1 minuto para recibir una cotización precisa y personalizada directo a tu WhatsApp.
              </p>
            </div>

            {clienteEnviado ? (
              <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-sm text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">¡Solicitud Recibida con Éxito!</h3>
                <p className="text-sm text-slate-600">
                  Gracias <strong>{clienteForm.nombre}</strong>. El carpintero ha recibido tus especificaciones técnicas y te responderá a la brevedad a tu WhatsApp (<strong>{clienteForm.telefono}</strong>).
                </p>
                <button
                  onClick={() => {
                    setClienteEnviado(false);
                    setClienteForm({
                      tipologiaId: 'corrediza_2h',
                      anchoAprox: 150,
                      altoAprox: 120,
                      calidadVidrio: 'dvh',
                      nombre: '',
                      telefono: '',
                      zona: 'Montevideo / Canelones'
                    });
                  }}
                  className="bg-[#4a208e] hover:bg-[#5a207e] text-white text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnviarFiltroCliente} className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-5">
                {/* 1. Selección de Tipología */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    1. ¿Qué abertura necesitás?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRICING_CONFIG.tipologias.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setClienteForm({ ...clienteForm, tipologiaId: t.id })}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                          clienteForm.tipologiaId === t.id
                            ? 'border-[#4a208e] bg-[#f8f4fc] ring-1 ring-[#4a208e] text-[#4a208e] font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {t.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Medidas aproximadas */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    2. Medidas aproximadas (en centímetros)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500">Ancho aprox. (cm)</span>
                      <input
                        type="number"
                        required
                        value={clienteForm.anchoAprox}
                        onChange={(e) => setClienteForm({ ...clienteForm, anchoAprox: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500">Alto aprox. (cm)</span>
                      <input
                        type="number"
                        required
                        value={clienteForm.altoAprox}
                        onChange={(e) => setClienteForm({ ...clienteForm, altoAprox: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    * No te preocupes por la exactitud milimétrica; rectificamos en obra antes de fabricar.
                  </span>
                </div>

                {/* 3. Calidad de Vidrio */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    3. Tipo de Vidrio preferido
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setClienteForm({ ...clienteForm, calidadVidrio: 'simple_4mm' })}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        clienteForm.calidadVidrio === 'simple_4mm'
                          ? 'border-[#4a208e] bg-[#f8f4fc] ring-1 ring-[#4a208e] font-bold text-[#4a208e]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>Estándar Simple</div>
                      <div className="text-[10px] text-slate-500 font-normal">Económico para interiores o zonas resguardadas</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setClienteForm({ ...clienteForm, calidadVidrio: 'dvh' })}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        clienteForm.calidadVidrio === 'dvh'
                          ? 'border-[#4a208e] bg-[#f8f4fc] ring-1 ring-[#4a208e] font-bold text-[#4a208e]'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>DVH Térmico / Acústico</span>
                        <span className="text-[9px] bg-purple-100 text-[#4a208e] px-1.5 py-0.2 rounded font-bold">Recomendado</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">Aísla el frío, calor y ruidos de la calle</div>
                    </button>
                  </div>
                </div>

                {/* 4. Datos del Cliente */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                    4. ¿A dónde te enviamos el presupuesto?
                  </label>

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Nombre completo *</span>
                    <input
                      type="text"
                      required
                      value={clienteForm.nombre}
                      onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                      placeholder="Ej: Martín Silva"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Celular / WhatsApp *</span>
                      <input
                        type="tel"
                        required
                        value={clienteForm.telefono}
                        onChange={(e) => setClienteForm({ ...clienteForm, telefono: e.target.value })}
                        placeholder="Ej: 099 123 456"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Zona / Departamento</span>
                      <input
                        type="text"
                        value={clienteForm.zona}
                        onChange={(e) => setClienteForm({ ...clienteForm, zona: e.target.value })}
                        placeholder="Ej: Pocitos, Montevideo"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4a208e] to-[#5a207e] hover:opacity-95 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Solicitar Presupuesto por WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VISTA 3: DEMO INTERACTIVA MÓDULO 3 (MINI CRM)        */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'crm_demo' && (
          <DemoModulo3 />
        )}

        {/* ---------------------------------------------------- */}
        {/* VISTA 4: CATÁLOGO MODULAR PARA LA WEB DE GRUPO AGN   */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'web_agn' && (
          <WebAGNSection onSelectModule={(tab) => handleTabChange(tab)} />
        )}

      </main>

      {/* Footer Branding Grupo AGN */}
      <footer className="bg-white border-t border-purple-100 py-3 text-center text-xs text-slate-500">
        Potenciado por <strong className="text-[#4a208e]">Grupo AGN</strong> • Marketing Digital & Soluciones Tecnológicas
      </footer>
    </div>
  );
}
